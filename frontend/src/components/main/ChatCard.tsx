import { Card, Flex, Avatar, Box, Text } from "@radix-ui/themes";
import useChatStore from "../../state/chatStore";

type Props = {
  name: string;
  email: string;
  lastmessage?: string;
  avatar?: string;
};
export default function ChatCard({ name, email, lastmessage, avatar }: Props) {
  const { setActiveChatScreen } = useChatStore();

  return (
    <Card
      size={"3"}
      m="2"
      style={lastmessage ? { height: "135px" } : {}}
      onClick={() => setActiveChatScreen(email, name)}
    >
      <Flex gap="3" align="center" ml="-2">
        <Avatar
          size="5"
          src={avatar}
          radius="full"
          fallback={
            name
              .split(" ")
              .map((n) => n[0])
              .join("") || "?"
          }
          mr="1"
        />
        <Box mt={lastmessage ? "-4" : "0"} width="100%">
          <Text as="div" size="4" weight="bold">
            {name}
          </Text>
          <Text as="div" size="1" weight="bold">
            {email}
          </Text>
          {lastmessage && (
            <Flex height={"9"} my="1" width="100%">
              <Card style={{ width: "100%" }} my="1">
                <Text as="div" size="2" color="gray">
                  {lastmessage}
                </Text>
              </Card>
            </Flex>
          )}
        </Box>
      </Flex>
    </Card>
  );
}
