import { Container } from "@radix-ui/themes";
import Toolbar from "./Toolbar";
import ChatCard from "./ChatCard";

const chats = [
  {
    name: "Teodros Girmay",
    email: "theodore@asd.com",
    lastmessage:
      "lorem ipsum dolor sit amet consectetur adipisicing elit sed do lorem ipsum dolor sit amet consectetur adipisicing elit sed do",
  },
  {
    name: "Teodros Girmay",
    email: "theodore@asd.com",
    lastmessage: "lorem ipsum dolor sit  adipisicing elit sed do",
  },
  {
    name: "Teodros Girmay",
    email: "theodore@asd.com",
    lastmessage: "lorem ",
  },
  {
    name: "Teodros Girmay",
    email: "theodore@asd.com",
    lastmessage:
      "lorem ipsum dolor sit amet consectetur adipisicing elit sed do lorem ipsum dolor sit amet consectetur adipisicing elit sed dolorem ipsum dolor sit amet consectetur adipisicing elit sed do lorem ipsum dolor sit amet consectetur adipisicing elit sed do",
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
        />
      ))}
    </Container>
  );
}
