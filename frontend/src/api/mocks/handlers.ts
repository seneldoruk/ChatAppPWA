import { graphql, HttpResponse } from "msw";
import { type Message } from "../__generated__/graphql";

export const handlers = [
  graphql.query("GetMessages", () => {
    const messages: Message[] = [
      {
        content: `Hello, world! ${new Date().toISOString()} `,
        createdAt: Date.now().toString(),
        fromEmail: "mock1@mock.com",
        toEmail: "",
      },
      {
        content: `Goodbye, world!  ${new Date().toISOString()}`,
        createdAt: (Date.now() + 3).toString(),
        fromEmail: "mock1@mock.com",
        toEmail: "",
      },
      {
        content: `Hello again, world!  ${new Date().toISOString()}`,
        createdAt: (Date.now() + 6).toString(),
        fromEmail: "mock2@mock.com",
        toEmail: "",
      },
    ];
    return HttpResponse.json({ data: { getMessages: messages } });
  }),
  graphql.mutation("LoginOrRegister", () => {
    return HttpResponse.json({ data: { loginOrRegister: "mocktoken" } });
  }),
  graphql.mutation("SendMessage", () => {
    return HttpResponse.json({
      data: {
        sendMessage: {
          content: "Hello, world!",
          createdAt: new Date().toISOString(),
          fromEmail: "",
          toEmail: "",
        },
      },
    });
  }),
];
export default handlers;
