import { Container } from "@radix-ui/themes";
import LoginIcon from "./LoginIcon";
import LoginOrRegisterForm from "./LoginOrRegisterForm";

export default function LoginOrRegister() {
  return (
    <Container mt="-9">
      <LoginIcon />
      <LoginOrRegisterForm />
    </Container>
  );
}
