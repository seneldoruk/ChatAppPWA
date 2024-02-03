import {
  Card,
  Text,
  Box,
  Heading,
  TextFieldInput,
  Flex,
  Button,
} from "@radix-ui/themes";

export default function LoginOrRegisterForm() {
  return (
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
          <TextFieldInput variant="classic" placeholder="Email" />
        </label>
      </Box>

      <Box mb="5" position="relative">
        <label>
          <Text as="div" size="2" weight="medium" mb="2">
            Password
          </Text>
          <TextFieldInput
            type="password"
            variant="classic"
            placeholder="Password"
          />
        </label>
      </Box>

      <Flex mt="6" justify="center" gap="3">
        <Button size="3" variant="outline" style={{ width: "100%" }}>
          Sign in
        </Button>
      </Flex>
    </Card>
  );
}
