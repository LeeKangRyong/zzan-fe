import { useAuthViewModel } from "@/domains/auth/viewmodel";
import { useAuthStore } from "@/domains/auth/store/authStore";
import { KakaoStartButton } from "@/domains/user/component";
import { CommonButton, Toast } from "@/shared/components";
import { Colors, Typography } from "@/shared/constants";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import InitialIcon from "../assets/logo/initial.svg";
import LogoIcon from "../assets/logo/logo_big.svg";

const isMockEnabled = (): boolean => {
  return Constants.expoConfig?.extra?.useMockData === true;
};

// WebView에서 JSON을 추출하는 JavaScript 코드
const injectedJavaScript = `
  (function() {
    try {
      // 페이지의 텍스트 내용을 가져옴
      const bodyText = document.body.innerText || document.body.textContent;

      // JSON으로 파싱 시도
      const jsonData = JSON.parse(bodyText);

      // React Native로 데이터 전송
      window.ReactNativeWebView.postMessage(JSON.stringify(jsonData));
    } catch (error) {
      console.log('Not a JSON page or parsing failed');
    }
  })();
  true;
`;

export default function LoginScreen() {
  const router = useRouter();
  const {
    loginWithMock,
    getKakaoLoginUrl,
    isLoading,
    error,
  } = useAuthViewModel();
  const [showToast, setShowToast] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.success && data.data?.accessToken && data.data?.refreshToken) {
        const { accessToken, refreshToken } = data.data;

        // 토큰을 직접 저장
        const { setTokens } = useAuthStore.getState();
        setTokens(accessToken, refreshToken);

        setShowWebView(false);
        router.push("/map");
      } else {
        setShowWebView(false);
      }
    } catch (error) {
      // Error parsing WebView message
    }
  };

  const handleWebViewNavigationStateChange = (_navState: any) => {
    // Navigation state tracking
  };

  const handleKakaoLogin = async () => {
    if (isMockEnabled()) {
      loginWithMock();
      router.push("/map");
      return;
    }

    const loginUrl = await getKakaoLoginUrl();

    if (!loginUrl) {
      return;
    }

    setWebViewUrl(loginUrl);
    setShowWebView(true);
  };

  const handleGuestLogin = () => {
    router.push("/map");
  };

  return (
    <View style={styles.container}>
      <Toast
        message={error}
        visible={showToast}
        onHide={() => setShowToast(false)}
      />
      <View style={styles.logoContainer}>
        <InitialIcon width={150} height={150} style={styles.logo} />
        <LogoIcon style={styles.logoMargin} />

        <View style={styles.textGroup}>
          <Text style={styles.initialText}>여행지에서 만난 전통주</Text>
          <Text style={styles.initialText}>모두 다같이 짠!</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.loginButton}
          onPress={handleKakaoLogin}
          disabled={isLoading}
        >
          <KakaoStartButton />
        </TouchableOpacity>

        <View style={styles.loginButton}>
          <CommonButton
            title="로그인 없이 시작하기"
            textColor={Colors.black}
            backColor={Colors.gray}
            onPress={handleGuestLogin}
          />
        </View>
      </View>

      {/* WebView Modal for Kakao Login */}
      <Modal visible={showWebView} animationType="slide">
        <View style={styles.webViewContainer}>
          <View style={styles.webViewHeader}>
            <Text style={styles.webViewTitle}>카카오 로그인</Text>
            <TouchableOpacity
              onPress={() => setShowWebView(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
          {webViewUrl && (
            <WebView
              source={{ uri: webViewUrl }}
              onNavigationStateChange={handleWebViewNavigationStateChange}
              onMessage={handleWebViewMessage}
              injectedJavaScript={injectedJavaScript}
              style={styles.webView}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellow,
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 10,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  logoMargin: {
    marginVertical: 20,
  },
  textGroup: {
    alignItems: "center",
    marginTop: 16,
    gap: 5,
  },
  initialText: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 18,
    color: Colors.black,
    lineHeight: 26,
  },
  bottomContainer: {
    marginBottom: 80,
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
  loginButton: {
    width: "80%",
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  webViewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.yellow,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  webViewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.black,
  },
  webView: {
    flex: 1,
  },
});
