import { useAuthStore } from "@/domains/auth/store/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/map" />;
  }

  return <Redirect href="/login" />;
}
