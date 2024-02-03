import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseContext } from "@apollo/server";

// biome-ignore lint/style/noNonNullAssertion:
const jwtSecret = process.env.JWT_KEY!;
const prisma = new PrismaClient();

function emailInContext(ctx: BaseContext): ctx is { email: string } {
	if ("email" in ctx) {
		return true;
	}
	throw new GraphQLError("Token isn't correct", {
		extensions: {
			code: "UNAUTHENTICATED",
			http: { status: 401 },
		},
	});
}

const queries = {
	getMessages: async (_: unknown, __: unknown, ctx: { email?: string }) => {
		if (emailInContext(ctx)) {
			const messages = await prisma.message.findMany({
				where: { toEmail: ctx.email },
			});
			try {
				await prisma.message.deleteMany({ where: { toEmail: ctx.email } });
				return messages;
			} catch (e) {
				throw new GraphQLError((e as Error).message);
			}
		}
	},
};

const mutations = {
	loginOrRegister: async (
		_: unknown,
		{ email, password }: { email: string; password: string },
	) => {
		const user = await prisma.user.findFirst({ where: { email } });
		if (!user) {
			const hashedPassword = await bcrypt.hash(password, 10);
			await prisma.user.create({ data: { email, password: hashedPassword } });
			return jwt.sign({ email }, jwtSecret);
		}

		if (user) {
			const valid = await bcrypt.compare(password, user.password);
			if (valid) {
				return jwt.sign({ email }, jwtSecret);
			}
			throw new GraphQLError("Password isn't correct", {
				extensions: {
					code: "UNAUTHENTICATED",
					http: { status: 401 },
				},
			});
		}
	},
	sendMessage: async (
		_: unknown,
		{ content, toEmail }: { content: string; toEmail: string },
		ctx: { email?: string },
	) => {
		if (emailInContext(ctx)) {
			const { email } = ctx;
			try {
				const message = await prisma.message.create({
					data: {
						content,
						toEmail,
						fromEmail: email,
					},
				});
				return message;
			} catch (e) {
				throw new GraphQLError((e as Error).message);
			}
		}
		return "";
	},
};
export { queries, mutations, prisma, jwtSecret };
