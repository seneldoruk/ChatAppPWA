import { Flex } from "@radix-ui/themes";
import Message, { MessageProps } from "./Message";
import useChatStore from "../../../state/chatStore";
import {
  getDatabase,
  getMessagesWithPagingForEmail,
} from "../../../utils/idb/idbUtils";

async function getMessagesFromDB(
  activeChatEmail: string,
): Promise<MessageProps[]> {
  const db = await getDatabase();
  const messages = await getMessagesWithPagingForEmail(
    db,
    activeChatEmail,
    0,
    10,
  );
  return messages
    .map((message) => ({
      content: message.message,
      sender: message.sentBy,
      date: message.timestamp,
    }))
    .reverse();
}
export default function Messages() {
  const messages = useChatStore((state) => state.activeMessages);
  const activeChatScreen = useChatStore((state) => state.activeChatScreen);

  if (!messages && activeChatScreen) {
    getMessagesFromDB(activeChatScreen?.email).then((messages) => {
      useChatStore.setState({ activeMessages: messages });
    });
  }
  return (
    <Flex width={"100%"} direction={"column"}>
      {messages &&
        messages.map((message, idx) => {
          return (
            <Message
              content={message.content}
              sender={message.sender}
              isLastMessage={idx === messages.length - 1}
              key={message.date}
              date={message.date}
            />
          );
        })}
    </Flex>
  );
}
