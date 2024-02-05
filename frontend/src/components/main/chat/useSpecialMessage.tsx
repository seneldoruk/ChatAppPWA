import { useState } from "react";

type SpecialMessage = "location" | "file" | "camera";
type Props = {
  sendMessageFunction: (data: { message: string }) => Promise<unknown>;
};
export default function useSpecialMessage({ sendMessageFunction }: Props) {
  const [loading, setLoading] = useState<SpecialMessage | null>();

  async function sendSpecialMessage(
    messageType: SpecialMessage,
    content: string,
  ) {
    const specialMessage = JSON.stringify({
      type: messageType,
      content,
    });
    return sendMessageFunction({ message: specialMessage });
  }

  async function sendLocation() {
    setLoading("location");
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        await sendSpecialMessage("location", `${latitude},${longitude}`);
        setLoading(null);
      },
    );
  }

  async function sendTextFile() {
    setLoading("file");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pickerOpts = {
      types: [
        {
          description: "Text Files",
          accept: {
            "text/plain": [".txt"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };

    const [fileHandle] = await (window as any)
      .showOpenFilePicker(pickerOpts)
      .catch(() => setLoading(null));
    const file = (await fileHandle.getFile()) as File;
    const text = await file.text();
    await sendSpecialMessage("file", text);

    setLoading(null);
  }

  return {
    loading,
    setLoading,
    sendSpecialMessage,
    sendLocation,
    sendTextFile,
  };
}
