import {
  Card,
  Text,
  Box,
  Heading,
  TextFieldInput,
  Flex,
  Button,
} from "@radix-ui/themes";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { LOGIN_OR_REGISTER } from "../../api/queriesandmutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorComponent from "./Error";
import useUserStore from "../../state/userStore";

export default function LoginOrRegisterForm() {
  const [login, { loading, error }] = useMutation(LOGIN_OR_REGISTER);
  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password too short" }),
  });
  type Login = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: {
      errors: { email: emailError, password: passwordError },
    },
  } = useForm<Login>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const setToken = useUserStore((state) => state.setToken);
  const onSubmit: SubmitHandler<Login> = async ({ email, password }) => {
    const token = (await login({ variables: { email, password } })).data
      ?.loginOrRegister;
    if (token) {
      setToken(token);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card variant="classic" size="4" mx="3">
        <Flex height="7" mb="4" justify="center">
          <Heading as="h3" size="6" mt="-1">
            Login or Register
          </Heading>
        </Flex>

        <Box mb="5">
          <label>
            <Text as="div" size="2" weight="medium" mb="2">
              Email address
            </Text>
            <TextFieldInput
              variant="classic"
              placeholder="Email"
              disabled={loading}
              {...register("email")}
            />
          </label>
          <ErrorComponent error={emailError?.message} />
        </Box>

        <Box mb="5" position="relative">
          <label>
            <Text as="div" size="2" weight="medium" mb="2">
              Password
            </Text>
            <TextFieldInput
              disabled={loading}
              autoComplete="current-password"
              type="password"
              variant="classic"
              placeholder="Password"
              {...register("password")}
            />
          </label>
          <ErrorComponent error={passwordError?.message} />
          <ErrorComponent error={error && "Invalid password"} />
        </Box>

        <Flex mt="6" justify="center" gap="3">
          <Button
            disabled={loading}
            size="3"
            variant="outline"
            style={{ width: "100%" }}
            type="submit"
          >
            Sign in
          </Button>
        </Flex>
      </Card>
    </form>
  );
}
