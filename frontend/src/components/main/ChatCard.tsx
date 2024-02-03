import { Card, Flex, Avatar, Box, Text } from "@radix-ui/themes";

type Props = {
  name: string;
  email: string;
  lastmessage: string;
  avatar?: string;
};
export default function ChatCard({ name, email, lastmessage, avatar }: Props) {
  return (
    <Card size="3" m="2" style={{ height: "135px" }}>
      <Flex gap="3" align="center" ml="-2">
        <Avatar
          size="5"
          src={avatar}
          radius="full"
          fallback={name.charAt(0)}
          mr="1"
        />
        <Box mt="-4" width="100%">
          <Text as="div" size="4" weight="bold">
            {name}
          </Text>
          <Text as="div" size="1" weight="bold">
            {email}
          </Text>
          <Flex height={"9"} mt="1" width="100%">
            <Card style={{ width: "100%" }}>
              <Text as="div" size="2" color="gray">
                {lastmessage}
              </Text>
            </Card>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
