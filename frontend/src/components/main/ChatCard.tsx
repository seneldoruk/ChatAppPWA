import {
  Card,
  Flex,
  Avatar,
  Box,
  Text,
  TextFieldInput,
  IconButton,
} from "@radix-ui/themes";
import useChatStore from "../../state/chatStore";
import { useRef, useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  getDatabase,
  getOverviews,
  setNameForEmail,
} from "../../utils/idb/idbUtils";
import { set } from "zod";

type Props = {
  name: string;
  email: string;
  lastmessage?: string;
  avatar?: string;
  componentEditable: boolean;
};
export default function ChatCard({
  name,
  email,
  lastmessage,
  avatar,
  componentEditable = false,
}: Props) {
  const { setActiveChatScreen } = useChatStore();
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [nameToDisplay, setNameToDisplay] = useState(name);
  const setOverviews = useChatStore((state) => state.setChatOverviews);

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
            nameToDisplay
              .split(" ")
              .map((n) => n[0])
              .join("") || "?"
          }
          mr="1"
        />
        <Box mt={lastmessage ? "-4" : "0"} width="100%">
          {componentEditable && isNameEditable ? (
            <Flex mb="2" gap={"2"} width="max-content">
              <TextFieldInput
                value={editedName}
                onChange={(e) => {
                  setEditedName(e.target.value);
                }}
              />
              <IconButton
                disabled={editedName === name || editedName.length < 1}
                variant="outline"
                onClick={async () => {
                  const db = await getDatabase();
                  await setNameForEmail(db, email, editedName);
                  const overviews = await getOverviews(db);
                  setOverviews(overviews);
                  setNameToDisplay(editedName);
                  setIsNameEditable(false);
                }}
              >
                <CheckIcon />
              </IconButton>
            </Flex>
          ) : (
            <Text
              as="div"
              size="4"
              weight="bold"
              onClick={() => setIsNameEditable(true)}
            >
              {nameToDisplay}
            </Text>
          )}
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
