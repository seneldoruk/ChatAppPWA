import { useQuery } from "@apollo/client";
import useChatStore from "../../state/chatStore";
import {
  addMessage,
  getDatabase,
  getOverviews,
  getMessagesWithPagingForEmail,
  setLastMessageForEmail,
} from "./idbUtils";
import { GET_MESSAGES } from "../../api/queriesandmutations";
import { useEffect } from "react";
import { Message } from "../../api/__generated__/graphql";
import { MessageProps } from "../../components/main/chat/Message";
import { showNotification } from "../notificationUtils";

async function getOverviewsFromDB() {
  const db = await getDatabase();
  return await getOverviews(db);
}

async function setNewMessagesToDB(newMessages: Message[]) {
  const db = await getDatabase();
  const affectedEmails = new Set<string>(newMessages.map((m) => m.fromEmail));

  for (const message of newMessages) {
    await addMessage(db, {
      theirEmail: message.fromEmail,
      message: message.content,
      timestamp: message.createdAt,
      sentBy: "them",
    });
  }

  for (const email of affectedEmails) {
    const lastMessageinDB = await getMessagesWithPagingForEmail(
      db,
      email,
      0,
      1,
    );
    await setLastMessageForEmail(
      db,
      email,
      lastMessageinDB[0].message,
      lastMessageinDB[0].timestamp,
    );
  }

  return await getOverviews(db);
}
async function getLatestMessagesFromDB(email: string) {
  const db = await getDatabase();
  return await getMessagesWithPagingForEmail(db, email, 0, 10);
}

// This hook queries backend for new messages, updates the indexedDB, and updates the global state
export default function useIndexedDB() {
  const chatOverviews = useChatStore((state) => state.chatOverviews);
  const setChatOverviews = useChatStore((state) => state.setChatOverviews);
  if (!chatOverviews) {
    getOverviewsFromDB().then((chatOverviews) => {
      useChatStore.setState({ chatOverviews });
    });
  }

  const { data } = useQuery(GET_MESSAGES, {
    pollInterval: 5000,
  });
  const newMessages = data?.getMessages;

  const currentChat = useChatStore((state) => state.activeChatScreen);
  useEffect(() => {
    if (newMessages) {
      setNewMessagesToDB(newMessages).then((overviewFromDB) =>
        setChatOverviews(overviewFromDB),
      );
      const affectedEmails = new Set<string>(
        newMessages.map((m) => m.fromEmail),
      );
      showNotification(
        "You Have New Messages",
        `From ${affectedEmails.size} chats!`,
      );
      if (currentChat && affectedEmails.has(currentChat?.email)) {
        getLatestMessagesFromDB(currentChat.email).then((messages) => {
          const mappedMessages: MessageProps[] = messages
            .map((message) => {
              return {
                sender: message.sentBy,
                date: message.timestamp,
                content: message.message,
              };
            })
            .reverse();
          useChatStore.setState({ activeMessages: mappedMessages });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessages]);

  return { chatOverviews };
}
