import { SyntheticEvent, useState } from "react";

type SpecialMessage = "location" | "file" | "image";
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

  async function sendJSFile() {
    setLoading("file");

    const pickerOpts = {
      types: [
        {
          description: "Text Files",
          accept: {
            "text/plain": [".js", ".ts", ".json", ".jsx", ".tsx"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [fileHandle] = await (window as any)
      .showOpenFilePicker(pickerOpts)
      .catch(() => setLoading(null));
    const file = (await fileHandle.getFile()) as File;
    const text = await file.text();
    await sendSpecialMessage("file", text);

    setLoading(null);
  }

  async function sendImage(e: SyntheticEvent<HTMLInputElement>) {
    setLoading("image");
    const toBase64 = (file: File) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return setLoading(null);
    const base64 = (await toBase64(file)) as string;
    await sendSpecialMessage("image", base64);
    setLoading(null);
  }

  return {
    loading,
    setLoading,
    sendSpecialMessage,
    sendLocation,
    sendJSFile,
    sendImage,
  };
}
