import { useAuthStore } from "@/domains/auth/store/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Redirect href="/map" />;
  }

  return <Redirect href="/login" />;
}
