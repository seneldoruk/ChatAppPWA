import {
  ScrollArea,
  Box,
  Flex,
  TextFieldInput,
  Button,
  Container,
} from "@radix-ui/themes";
import ChatCard from "../ChatCard";
import useChatStore from "../../../state/chatStore";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import Messages from "./Messages";
import SpecialMessageButton from "./SpecialMessageButton";

export default function ChatScreen() {
  const activeChatScreen = useChatStore((state) => state.activeChatScreen);
  if (!activeChatScreen) return null;
  const { email, name } = activeChatScreen;
  return (
    <Box
      position={"absolute"}
      style={{
        width: "100%",
        top: 97,
        left: 0,
        height: "calc(100vh - 97px)",
      }}
      p={"1"}
      pb={"7"}
    >
      <Flex
        direction={"column"}
        style={{
          backgroundColor: "color(display-p3 0.1059 0.1137 0.1176 / 1)",
          borderRadius: "8px",
          height: "100%",
        }}
        my="2"
        mx={"1"}
        px={"2"}
      >
        <ChatCard name={name} email={email} />
        <ScrollArea scrollbars="vertical" mx={"2"} style={{ height: "80%" }}>
          <Box p="2" pr="8">
            <Messages />
          </Box>
        </ScrollArea>
        <Flex width="100%" justify={"between"} align={"center"} my="3">
          <Box width={"100%"} mr="4">
            <TextFieldInput
              radius="full"
              placeholder="Write a new message"
              size="3"
            />
          </Box>
          <Flex gap="2">
            <SpecialMessageButton />
            <Button radius="full" variant="soft">
              <PaperPlaneIcon />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
