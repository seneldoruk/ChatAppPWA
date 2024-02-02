import { v4 as uuid } from "uuid";

const user1 = uuid();
const user2 = uuid();
const message1 = uuid();
const message2 = uuid();
const message3 = uuid();
const message4 = uuid();
const message5 = uuid();

let user1jwt = "";
let user2jwt = "";

function request(body: object, jwt?: string) {
	return cy.request({
		method: "POST",
		url: "http://localhost:8000/",
		body: body,
		failOnStatusCode: false,
		headers: {
			authorization: jwt,
		},
	});
}

it("create users", () => {
	request({
		query: `mutation LoginOrRegister($email: String!, $password: String!) {
			loginOrRegister(email: $email, password: $password)
		}`,
		variables: {
			email: user1,
			password: user1,
		},
		operationName: "LoginOrRegister",
	}).then((res) => {
		expect(res.status).to.eq(200);
		user1jwt = res.body.data.loginOrRegister;
	});

	request({
		query: `mutation LoginOrRegister($email: String!, $password: String!) {
			loginOrRegister(email: $email, password: $password)
		}`,
		variables: {
			email: user2,
			password: user2,
		},
		operationName: "LoginOrRegister",
	}).then((res) => {
		expect(res.status).to.eq(200);
		user2jwt = res.body.data.loginOrRegister;
	});
});

it("rejects false passwords", () => {
	request({
		query: `mutation LoginOrRegister($email: String!, $password: String!) {
			loginOrRegister(email: $email, password: $password)
		}`,
		variables: {
			email: user1,
			password: "",
		},
		operationName: "LoginOrRegister",
	}).then((res) => {
		expect(res.status).to.eq(401);
	});

	request({
		query: `mutation LoginOrRegister($email: String!, $password: String!) {
			loginOrRegister(email: $email, password: $password)
		}`,
		variables: {
			email: user2,
			password: "",
		},
		operationName: "LoginOrRegister",
	}).then((res) => {
		expect(res.status).to.eq(401);
	});
});

it("send messages", () => {
	request(
		{
			query: `mutation SendMessage($content: String!, $toEmail: String!) {
			sendMessage(content: $content, toEmail: $toEmail) {
				content
				toEmail
				fromEmail
				createdAt
			}
		}`,
			variables: {
				content: message1,
				toEmail: user2,
			},
			operationName: "SendMessage",
		},
		user1jwt,
	).then((res) => {
		expect(res.status).to.eq(200);
	});

	request(
		{
			query: `mutation SendMessage($content: String!, $toEmail: String!) {
			sendMessage(content: $content, toEmail: $toEmail) {
				content
				toEmail
				fromEmail
				createdAt
			}
		}`,
			variables: {
				content: message2,
				toEmail: user1,
			},
			operationName: "SendMessage",
		},
		user2jwt,
	).then((res) => {
		expect(res.status).to.eq(200);
	});
	request(
		{
			query: `mutation SendMessage($content: String!, $toEmail: String!) {
			sendMessage(content: $content, toEmail: $toEmail) {
				content
				toEmail
				fromEmail
				createdAt
			}
		}`,
			variables: {
				content: message3,
				toEmail: user2,
			},
			operationName: "SendMessage",
		},
		user1jwt,
	).then((res) => {
		expect(res.status).to.eq(200);
	});

	request(
		{
			query: `mutation SendMessage($content: String!, $toEmail: String!) {
			sendMessage(content: $content, toEmail: $toEmail) {
				content
				toEmail
				fromEmail
				createdAt
			}
		}`,
			variables: {
				content: message4,
				toEmail: user1,
			},
			operationName: "SendMessage",
		},
		user2jwt,
	).then((res) => {
		expect(res.status).to.eq(200);
	});
	request(
		{
			query: `mutation SendMessage($content: String!, $toEmail: String!) {
			sendMessage(content: $content, toEmail: $toEmail) {
				content
				toEmail
				fromEmail
				createdAt
			}
		}`,
			variables: {
				content: message5,
				toEmail: user1,
			},
			operationName: "SendMessage",
		},
		user2jwt,
	).then((res) => {
		expect(res.status).to.eq(200);
	});
});

it("get messages", () => {
	request(
		{
			query: `query GetMessages {
			getMessages {
				content
				fromEmail
			}
		}`,
		},
		user1jwt,
	).then((res) => {
		expect(res.status).to.eq(200);
		const messages = res.body.data.getMessages;
		expect(messages.length).to.eq(3);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		expect(messages.map((m: any) => m.content).join()).to.eql(
			[message2, message4, message5].join(),
		);
		expect(messages[0].fromEmail).to.eq(user2);
	});

	request(
		{
			query: `query GetMessages {
			getMessages {
				content
				fromEmail
			}
		}`,
		},
		user2jwt,
	).then((res) => {
		expect(res.status).to.eq(200);
		const messages = res.body.data.getMessages;
		expect(messages.length).to.eq(2);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		expect(messages.map((m: any) => m.content).join()).to.eql(
			[message1, message3].join(),
		);
		expect(messages[0].fromEmail).to.eq(user1);
	});
});

it("cant get messages for the second time", () => {
	request(
		{
			query: `query GetMessages {
			getMessages {
				content
			}
		}`,
		},
		user1jwt,
	).then((res) => {
		expect(res.status).to.eq(200);
		const messages = res.body.data.getMessages;
		expect(messages.length).to.eq(0);
	});

	request(
		{
			query: `query GetMessages {
			getMessages {
				content
			}
		}`,
		},
		user2jwt,
	).then((res) => {
		expect(res.status).to.eq(200);
		const messages = res.body.data.getMessages;
		expect(messages.length).to.eq(0);
	});
});
