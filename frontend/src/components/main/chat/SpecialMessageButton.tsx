import { Popover, Button, Flex } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

export default function SpecialMessageButton({ disabled = false }) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button radius="full" variant="soft" color="green" disabled={disabled}>
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
