import { Text, Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
const contactsSupported = "contacts" in navigator;

export default function NewChat() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" size="3">
          <PlusIcon />
          New Chat
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex justify={"center"} align={"center"} direction={"column"}>
          <Dialog.Title size="8">New Chat</Dialog.Title>
          {contactsSupported && (
            <Button my="3" variant="soft" size="4">
              Pick a contact
            </Button>
          )}
        </Flex>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Input placeholder="Freja Johnsen" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Input placeholder="freja@example.com" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              First message
            </Text>
            <TextField.Input placeholder="Hi!" />
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="soft">Send</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
