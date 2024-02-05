import { Popover, Button, Flex } from "@radix-ui/themes";
import { GlobeIcon, PlusIcon } from "@radix-ui/react-icons";
type Props = {
  disabled: boolean;
  sendMessageFunction: (data: { message: string }) => void;
};

export default function SpecialMessageButton({
  disabled,
  sendMessageFunction,
}: Props) {
  function sendSpecialMessage(messageType: "location" | "", content: string) {
    const specialMessage = JSON.stringify({
      type: messageType,
      content,
    });
    sendMessageFunction({ message: specialMessage });
  }
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
            variant="outline"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                  sendSpecialMessage("location", `${latitude},${longitude}`);
                },
              );
            }}
          >
            <GlobeIcon />
          </Button>
          <Button variant="outline">
            <PlusIcon />
          </Button>
          <Button variant="outline">
            <PlusIcon />
          </Button>
          <Button variant="outline">
            <PlusIcon />
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
