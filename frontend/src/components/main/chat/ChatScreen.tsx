import {
  ScrollArea,
  Box,
  Flex,
  TextFieldInput,
  Button,
} from "@radix-ui/themes";
import ChatCard from "../ChatCard";
import useChatStore from "../../../state/chatStore";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import Messages from "./Messages";
import SpecialMessageButton from "./SpecialMessageButton";
import { useForm } from "react-hook-form";
import { SEND_MESSAGE } from "../../../api/queriesandmutations";
import { useMutation } from "@apollo/client";
import ErrorComponent from "../../login/Error";
import {
  addMessage,
  getDatabase,
  getMessagesWithPagingForEmail,
} from "../../../utils/idb/idbUtils";
import { useRef } from "react";

async function putNewMessageInDBAndUpdateState(
  toEmail: string,
  message: string,
) {
  const db = await getDatabase();
  await addMessage(db, {
    message,
    sentBy: "me",
    timestamp: Date.now().toString(),
    theirEmail: toEmail,
  });
  const messages = await getMessagesWithPagingForEmail(db, toEmail, 0, 10);
  console.log(messages);
  const mappedMessages = messages
    .map((message) => ({
      content: message.message,
      sender: message.sentBy,
      date: message.timestamp,
    }))
    .sort()
    .reverse();
  return mappedMessages;
}

export default function ChatScreen() {
  const { register, handleSubmit, setValue } = useForm<{ message: string }>({});
  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE);
  const currentChatEmail = useChatStore(
    (state) => state.activeChatScreen?.email,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const setCurrentMessages = useChatStore((state) => state.setActiveMessages);
  const submit = (data: { message: string }) => {
    sendMessage({
      variables: { content: data.message, toEmail: currentChatEmail! },
    }).then(() => {
      if (!error) {
        putNewMessageInDBAndUpdateState(currentChatEmail!, data.message).then(
          (messages) => {
            setCurrentMessages(messages);
            console.log("here");
          },
        );
      }
      setValue("message", "");
    });
  };

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
        <ErrorComponent error={error?.message} />
        <form onSubmit={handleSubmit(submit)}>
          <Flex width="100%" justify={"between"} align={"center"} my="3">
            <Box width={"100%"} mr="4">
              <TextFieldInput
                disabled={loading}
                radius="full"
                placeholder="Write a new message"
                size="3"
                {...register("message")}
              />
            </Box>
            <Flex gap="2">
              <SpecialMessageButton disabled={loading} />
              <Button
                radius="full"
                variant="soft"
                type="submit"
                disabled={loading}
              >
                <PaperPlaneIcon />
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
}
