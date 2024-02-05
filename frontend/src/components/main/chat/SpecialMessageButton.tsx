import { Popover, Button, Flex } from "@radix-ui/themes";
import {
  CameraIcon,
  FileIcon,
  FileTextIcon,
  GlobeIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import useSpecialMessage from "./useSpecialMessage";
import { IconButtonWithExplanation } from "./IconButtonWithExplanation";
type Props = {
  disabled: boolean;
  sendMessageFunction: (data: { message: string }) => Promise<unknown>;
};

export default function SpecialMessageButton({
  disabled,
  sendMessageFunction,
}: Props) {
  const { loading, sendLocation, sendJSFile, sendImage } = useSpecialMessage({
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
          <IconButtonWithExplanation
            icon={<GlobeIcon />}
            explanation={"Send Your Location"}
            disabled={loading === "location"}
            onClick={sendLocation}
          />
          <IconButtonWithExplanation
            icon={<FileTextIcon />}
            explanation={"Send a JS File"}
            disabled={loading === "file"}
            onClick={sendJSFile}
          />
          <IconButtonWithExplanation
            icon={<CameraIcon />}
            explanation={"Send a Photo"}
            disabled={loading === "image"}
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
          </IconButtonWithExplanation>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
