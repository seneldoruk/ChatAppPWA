import { Box, Flex, Heading } from "@radix-ui/themes";
import ChatAppIcon from "./ChatAppIcon";

export default function LoginIcon() {
  return (
    <Flex direction="column" style={{ alignItems: "center" }} mb="6" mt="-9">
      <Box width="9">
        <ChatAppIcon />
      </Box>
      <Heading as="h1" size="8" weight="medium" mt="2" ml="2">
        ChatAppPWA
      </Heading>
    </Flex>
  );
}
