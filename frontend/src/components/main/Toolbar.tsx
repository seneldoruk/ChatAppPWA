import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Separator,
} from "@radix-ui/themes";
import ChatAppIcon from "../../assets/ChatAppIcon";
import NewChat from "./NewChat";
import useChatStore from "../../state/chatStore";
import { Cross1Icon } from "@radix-ui/react-icons";
import { checkPermissionAndListen } from "./chat/shakeListener.ts";

export default function Toolbar() {
  const activeChatScreen = useChatStore((state) => state.activeChatScreen);
  const closeChat = useChatStore((state) => state.closeChatScreen);

  checkPermissionAndListen(closeChat);
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
          {activeChatScreen ? (
            <Button
              size="3"
              color="crimson"
              onClick={closeChat}
              variant="outline"
            >
              <Cross1Icon color="crimson" />
              Close Chat
            </Button>
          ) : (
            <NewChat />
          )}
        </Flex>
      </Flex>
      <Separator my="3" size="4" />
    </Container>
  );
}
