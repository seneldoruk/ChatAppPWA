import { Container } from "@radix-ui/themes";
import Toolbar from "./Toolbar";
import ChatCard from "./ChatCard";
import ChatScreen from "./chat/ChatScreen";
import useIndexedDB from "../../utils/idb/useIndexedDB";

export default function MainLayout() {
  const { chatOverviews } = useIndexedDB();
  return (
    <Container style={{ height: "100vh" }}>
      <Toolbar />
      {chatOverviews &&
        chatOverviews.map((chat) => (
          <ChatCard
            componentEditable={false}
            name={chat.name}
            email={chat.email}
            lastmessage={chat.lastMessage}
            key={chat.email}
          />
        ))}
      {<ChatScreen />}
    </Container>
  );
}
