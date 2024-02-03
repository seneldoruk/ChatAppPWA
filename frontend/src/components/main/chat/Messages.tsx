import { Flex } from "@radix-ui/themes";
import Message, { MessageProps } from "./Message";

export default function Messages() {
  const messages: MessageProps[] = [
    {
      sender: "me",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.  voluptate blanditiis. Quisquam, nostrum consectetur.",
      date: "123123",
    },
    {
      sender: "them",
      content: "lorem ipsum dolor sit amet consectetur adipisicing elit sed do",
      date: "123124",
    },
    {
      sender: "me",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.  voluptate blanditiis. Quisquam, nostrum consectetur.",
      date: "123125",
    },
    {
      sender: "me",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.  voluptate blanditiis. Quisquam, nostrum consectetur.",
      date: "123126",
    },
    {
      sender: "them",
      content: "lorem ipsum dolor sit amet consectetur adipisicing elit sed do",
      date: "123127",
    },
    {
      sender: "me",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.  voluptate blanditiis. Quisquam, nostrum consectetur.",
      date: "123128",
    },
    {
      sender: "them",
      content: "lorem ipsum dolor sit amet consectetur adipisicing elit sed do",
      date: "123129",
    },
    {
      sender: "me",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.  voluptate blanditiis. Quisquam, nostrum consectetur.",
      date: "123130",
    },
  ];
  return (
    <Flex width={"100%"} direction={"column"}>
      {messages.map((message, idx) => {
        return (
          <Message
            content={message.content}
            sender={message.sender}
            isLastMessage={idx === messages.length - 1}
            key={message.date}
          />
        );
      })}
    </Flex>
  );
}
