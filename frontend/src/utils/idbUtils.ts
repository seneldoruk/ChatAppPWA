import { openDB, type IDBPDatabase } from "idb";

type messageInDB = {
  sentBy: "me" | "them";
  theirEmail: string;
  message: string;
  timestamp: string | number;
};

async function getDatabase() {
  return await openDB("chat", 1, {
    upgrade(db) {
      const messagesStore = db.createObjectStore("messages", {
        keyPath: ["timestamp", "theirEmail"],
      });
      db.createObjectStore("chatOverview", {
        keyPath: "email",
      });

      messagesStore.createIndex("theirEmail", "theirEmail", {
        unique: false,
        multiEntry: true,
      });
    },
  });
}

async function getOverviews(db: IDBPDatabase<unknown>) {
  return await db.getAll("chatOverview");
}
async function setNameForEmail(
  db: IDBPDatabase<unknown>,
  email: string,
  name: string,
) {
  const overview = db.get("chatOverview", email);
  await db.put("chatOverview", { ...overview, name });
}
async function setLastMessageForEmail(
  db: IDBPDatabase<unknown>,
  email: string,
  lastMessage: string,
  timestamp: string,
) {
  const overview = db.get("chatOverview", email);
  await db.put("chatOverview", { ...overview, lastMessage, timestamp });
}

async function getMessagesForEmail(db: IDBPDatabase<unknown>, email: string) {
  return await db.getAllFromIndex("messages", "theirEmail", email);
}

async function addMessage(db: IDBPDatabase<unknown>, message: messageInDB) {
  await db.add("messages", message);
}

/*
 * Get messages with paging for a specific email
 * @param page - page number starting from 0
 * @returns - an array of messages starting from the last message
 */
async function getMessagesWithPagingForEmail(
  db: IDBPDatabase<unknown>,
  email: string,
  page: number,
  pageSize: number,
) {
  const messages: messageInDB[] = [];
  const tx = db.transaction("messages");
  const store = tx.store.index("theirEmail");
  const cursor = await store.openCursor(email, "prev");
  let count = 0;
  if (cursor && page > 0) {
    await cursor.advance(pageSize * page);
  }
  while (cursor) {
    if (count < pageSize) {
      messages.push(cursor.value);
      await cursor.continue();
      count++;
    } else {
      break;
    }
  }
  return messages;
}

export {
  getDatabase,
  getOverviews,
  setNameForEmail,
  setLastMessageForEmail,
  getMessagesForEmail,
  addMessage,
  getMessagesWithPagingForEmail,
  type messageInDB,
};
