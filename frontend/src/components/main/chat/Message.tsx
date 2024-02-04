import { Callout } from "@radix-ui/themes";

export type sender = "me" | "them";
export type MessageProps = {
  content: string;
  sender: sender;
  date: string;
  isLastMessage?: boolean;
};
export default function Message({
  content,
  sender,
  isLastMessage,
}: MessageProps) {
  return (
    <Callout.Root
      color={sender === "me" ? "blue" : "green"}
      my={"2"}
      ml={"3"}
      style={{
        maxWidth: "70%",
        alignSelf: sender === "me" ? "flex-end" : "flex-start",
      }}
      ref={(el) => {
        if (isLastMessage) {
          el?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <Callout.Text>{content}</Callout.Text>
    </Callout.Root>
  );
}
