import { Popover, Button, Flex } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

export default function SpecialMessageButton() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button radius="full" variant="soft" color="green">
          <PlusIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Flex gap="3">
          <Button variant="outline">
            <PlusIcon />
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
