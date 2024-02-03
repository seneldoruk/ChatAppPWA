import { Container } from "@radix-ui/themes";
import Toolbar from "./Toolbar";
import ChatCard from "./ChatCard";
import ChatScreen from "./chat/ChatScreen";

const chats = [
  {
    name: "Teodros Girmay",
    email: "theodore@asd.com",
    lastmessage:
      "lorem ipsum dolor sit amet consectetur adipisicing elit sed do lorem ipsum dolor sit amet consectetur adipisicing elit sed do",
    date: "123123",
  },
  {
    name: "Teodros Girmay",
    email: "theodore@asd.com",
    lastmessage: "lorem ipsum dolor sit  adipisicing elit sed do",
    date: "123124",
  },
  {
    name: "Teodros Girmay",
    email: "theodore@asd.com",
    lastmessage: "lorem ",
    date: "123125",
  },
  {
    name: "Teodros Girmay",
    email: "theodore@asd.com",
    lastmessage:
      "lorem ipsum dolor sit amet consectetur adipisicing elit sed do lorem ipsum dolor sit amet consectetur adipisicing elit sed dolorem ipsum dolor sit amet consectetur adipisicing elit sed do lorem ipsum dolor sit amet consectetur adipisicing elit sed do",
    date: "123126",
  },
];
export default function MainLayout() {
  return (
    <Container style={{ height: "100vh" }}>
      <Toolbar />
      {chats.map((chat) => (
        <ChatCard
          name={chat.name}
          email={chat.email}
          lastmessage={chat.lastmessage}
          key={chat.email}
        />
      ))}
      {<ChatScreen />}
    </Container>
  );
}
