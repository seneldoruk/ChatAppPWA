import { Box, Container, Flex, Heading, Separator } from "@radix-ui/themes";
import ChatAppIcon from "../../assets/ChatAppIcon";
import NewChat from "./NewChat";

export default function Toolbar() {
  return (
    <Container p="1" mt="4" mb="1" px="3">
      <Flex justify={"between"}>
        <Flex height="9" align={"center"}>
          <Box width="7">
            <ChatAppIcon />
          </Box>
          <Heading as="h1" size="7" weight="medium" ml="2">
            ChatAppPWA
          </Heading>
        </Flex>
        <Flex align={"center"}>
          <NewChat />
        </Flex>
      </Flex>
      <Separator my="3" size="4" />
    </Container>
  );
}
