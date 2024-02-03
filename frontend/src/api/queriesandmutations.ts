import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "@apollo/client";
import {
	Message,
	MutationLoginOrRegisterArgs,
	MutationSendMessageArgs,
} from "./__generated__/graphql";

const LOGIN_OR_REGISTER: TypedDocumentNode<
	{ loginOrRegister: string },
	MutationLoginOrRegisterArgs
> = gql(
	/* GraphQL */
	`mutation LoginOrRegister($email: String!, $password: String!) {
    loginOrRegister(email: $email, password: $password)
}`,
);
const SEND_MESSAGE: TypedDocumentNode<Message, MutationSendMessageArgs> =
	gql(/* GraphQL */ `mutation SendMessage($content: String!, $toEmail: String!) {
    sendMessage(content: $content, toEmail: $toEmail) {
        content
        toEmail
        fromEmail
        createdAt
    }
}`);

const GET_MESSAGES: TypedDocumentNode<Message[]> = gql(/* GraphQL */ `query GetMessages {
    getMessages {
        content
        fromEmail
    }
}`);

export { LOGIN_OR_REGISTER, SEND_MESSAGE, GET_MESSAGES };
