import { Popover, Button, Flex } from "@radix-ui/themes";
import {
  CameraIcon,
  FileIcon,
  GlobeIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import useSpecialMessage from "./useSpecialMessage";
type Props = {
  disabled: boolean;
  sendMessageFunction: (data: { message: string }) => Promise<unknown>;
};

export default function SpecialMessageButton({
  disabled,
  sendMessageFunction,
}: Props) {
  const { loading, sendLocation, sendTextFile, sendImage } = useSpecialMessage({
    sendMessageFunction,
  });
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button radius="full" variant="soft" color="green" disabled={disabled}>
          <PlusIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Flex gap="3">
          <Button
            disabled={loading === "location"}
            variant="outline"
            onClick={sendLocation}
          >
            <GlobeIcon />
          </Button>
          <Button
            variant="outline"
            disabled={loading == "file"}
            onClick={sendTextFile}
          >
            <FileIcon />
          </Button>
          <Button
            disabled={loading === "image"}
            variant="outline"
            onClick={() =>
              (document.querySelector("#fileinput") as HTMLInputElement).click()
            }
          >
            <input
              id="fileinput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={sendImage}
            />
            <CameraIcon />
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
