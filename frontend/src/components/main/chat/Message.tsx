import { FileIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Callout, Link } from "@radix-ui/themes";
import { ReactNode } from "react";

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
  let modifiedContent: ReactNode | string;
  try {
    const parsedMessage: { type: string; content: string } =
      JSON.parse(content);
    const mesesageMapper: Record<string, ReactNode> = {
      location: (
        <Link
          target="_blank"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          href={`https://www.google.com/maps/place/${parsedMessage.content}`}
        >
          <GlobeIcon /> View Location On Map
        </Link>
      ),
      file: (
        <>
          <Link
            target="_blank"
            href={URL.createObjectURL(
              new Blob([parsedMessage.content], { type: "text/plain" }),
            )}
            download={`textfile-${Date.now()}`}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <FileIcon /> Download Text File
          </Link>
        </>
      ),
      image: <></>,
    };
    if (mesesageMapper[parsedMessage.type]) {
      modifiedContent = mesesageMapper[parsedMessage.type];
    }
  } catch (e) {
    /* empty */
  } finally {
    if (!modifiedContent) modifiedContent = content;
  }

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
      <Callout.Text>{modifiedContent}</Callout.Text>
    </Callout.Root>
  );
}
