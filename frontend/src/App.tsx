import LoginOrRegister from "./components/login/LoginOrRegister";
import MainLayout from "./components/main/MainLayout";
import useUserStore from "./state/userStore";

export default function App() {
  const token = useUserStore((state) => state.token);

  if (token) return <MainLayout />;
  return <LoginOrRegister />;
}
