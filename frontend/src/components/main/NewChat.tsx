import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import ErrorComponent from "../login/Error";
import useNewChat from "./useNewChat";

const contactsSupported = "contacts" in navigator;

export default function NewChat() {
  const {
    register,
    handleSubmit,
    setValue,
    disabled,
    loading,
    onSubmit,
    emailError,
    nameError,
    messageError,
  } = useNewChat();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="outline"
          size="3"
          disabled={loading}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <PlusIcon />
          New Chat
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex justify={"center"} align={"center"} direction={"column"}>
          <Dialog.Title size="8">New Chat</Dialog.Title>
          {contactsSupported && (
            <Button
              my="3"
              variant="soft"
              size="4"
              onClick={async () => {
                try {
                  const props = ["name", "email"];
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const contacts = await (navigator as any).contacts.select(
                    props,
                    {
                      multiple: false,
                    },
                  );
                  const { contactName, contactEmail } = contacts[0];
                  const name = contactName ?? "Name not provided";
                  const email = contactEmail ?? "Email not provided";
                  setValue("name", name);
                  setValue("email", email);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Pick a contact
            </Button>
          )}
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                {...register("name")}
                autoComplete="name"
                placeholder="Freja Johnsen"
              />
            </label>
            <ErrorComponent error={nameError?.message} />
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                {...register("email")}
                autoComplete="email"
                placeholder="freja@example.com"
              />
            </label>
            <ErrorComponent error={emailError?.message} />
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                First message
              </Text>
              <ErrorComponent error={messageError?.message} />
              <TextField.Input {...register("message")} placeholder="Hi!" />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button variant="soft" type="submit" disabled={disabled}>
                Send
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
