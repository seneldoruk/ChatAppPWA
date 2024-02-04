import { IDBPDatabase } from "idb";
import {
  getDatabase,
  addMessage,
  getMessagesForEmail,
  messageInDB,
  getMessagesWithPagingForEmail,
} from "./idbUtils";
import { v4 as uuid } from "uuid";

let db: IDBPDatabase<unknown>;

beforeAll(async () => {
  db = await getDatabase();
});

afterAll(async () => {
  if (!db) return;
  db.close();
});

test("add and get messages", async () => {
  const email = uuid();
  const message: messageInDB = {
    sentBy: "me",
    theirEmail: email,
    message: "Hello",
    timestamp: uuid(),
  };
  await addMessage(db, message);
  const messages = await getMessagesForEmail(db, email);
  expect(messages).toEqual([message]);
});

test("add 30 messages and paginate by 10", async () => {
  const email = uuid();
  const messages: messageInDB[] = Array.from({ length: 30 }, (_, i) => ({
    sentBy: i % 2 === 0 ? "me" : "them",
    theirEmail: email,
    message: `Message ${i}`,
    timestamp: i > 9 ? i.toString() : "0" + i.toString(),
  }));

  //add 10 messages from another email
  const email2 = uuid();
  const messages2: messageInDB[] = Array.from({ length: 10 }, (_, i) => ({
    sentBy: i % 2 === 0 ? "me" : "them",
    theirEmail: email2,
    message: `Message ${i}`,
    timestamp: i > 9 ? i.toString() : "0" + i.toString(),
  }));
  const mixedMessages = [...messages, ...messages2];

  //shuffle the mixedMessages array
  for (let i = mixedMessages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedMessages[i], mixedMessages[j]] = [mixedMessages[j], mixedMessages[i]];
  }
  for (const message of mixedMessages) {
    await addMessage(db, message);
  }

  const page1 = await getMessagesWithPagingForEmail(db, email, 0, 10);
  const page2 = await getMessagesWithPagingForEmail(db, email, 1, 10);
  const page3 = await getMessagesWithPagingForEmail(db, email, 2, 10);

  expect(JSON.stringify(page1)).toEqual(
    JSON.stringify(messages.sort().slice(20, 30).reverse()),
  );
  expect(JSON.stringify(page2)).toEqual(
    JSON.stringify(messages.sort().slice(10, 20).reverse()),
  );

  expect(JSON.stringify(page3)).toEqual(
    JSON.stringify(messages.sort().slice(0, 10).reverse()),
  );
});
