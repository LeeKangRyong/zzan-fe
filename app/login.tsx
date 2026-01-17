import { useAuthViewModel } from "@/domains/auth/viewmodel";
import { KakaoStartButton } from "@/domains/user/component";
import { CommonButton, Toast } from "@/shared/components";
import { Colors, Typography } from "@/shared/constants";
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InitialIcon from '../assets/logo/initial.svg';
import LogoIcon from '../assets/logo/logo_big.svg';

const isMockEnabled = (): boolean => {
  return Constants.expoConfig?.extra?.useMockData === true;
};

export default function LoginScreen() {
  const router = useRouter();
  const { loginWithMock, getKakaoLoginUrl, handleKakaoCallback, isLoading, error } = useAuthViewModel();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

  const handleKakaoLogin = async () => {
    if (isMockEnabled()) {
      loginWithMock();
      router.push('/map');
      return;
    }

    const url = await getKakaoLoginUrl();
    if (!url) return;

    // TODO: 실제 카카오 OAuth WebBrowser 연동 필요
    // const result = await WebBrowser.openAuthSessionAsync(url);
    // if (result.type === 'success') {
    //   const code = extractCodeFromUrl(result.url);
    //   const success = await handleKakaoCallback(code);
    //   if (success) router.push('/map');
    // }
    router.push('/map');
  };

  const handleGuestLogin = () => {
    router.push('/map');
  };

  return (
    <View style={styles.container}>
      <Toast message={error} visible={showToast} onHide={() => setShowToast(false)} />
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  logoMargin: {
    marginVertical: 20,
  },
  textGroup: {
    alignItems: 'center',
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
    alignItems: 'center',
    width: '100%',
    gap: 15,
  },
  loginButton: {
    width: '80%',
  },
});