import { KakaoStartButton } from "@/domains/user/component";
import { CommonButton } from "@/shared/components";
import { Colors, Typography } from "@/shared/constants";
import { useRouter } from 'expo-router'; // useRouter 추가
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InitialIcon from '../assets/logo/initial.svg';
import LogoIcon from '../assets/logo/logo_big.svg';

export default function LoginScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/main');
  };

  return (
    <View style={styles.container}>
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
          onPress={handlePress}
        >
          <KakaoStartButton />
        </TouchableOpacity>

        <View style={styles.loginButton}>
          <CommonButton 
            title="로그인 없이 시작하기" 
            textColor={Colors.black} 
            backColor={Colors.gray} 
            onPress={handlePress}
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