import {
	ApolloServer,
	ApolloServerOptionsWithTypeDefs,
	BaseContext,
} from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import typeDefs from "./typeDefs.js";
import "dotenv/config";
import { queries, mutations, jwtSecret, prisma } from "./resolvers.js";

const resolvers: ApolloServerOptionsWithTypeDefs<BaseContext>["resolvers"] = {
	Query: queries,
	Mutation: mutations,
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
	listen: { port: 8000 },
	context: async ({ req, res }) => {
		const token = req.headers.authorization || "";
		try {
			// biome-ignore lint/suspicious/noExplicitAny:
			const email = (jwt.verify(token, jwtSecret) as any).email;
			return { email };
		} catch {
			return {};
		}
	},
});
console.log(`🚀 Server listening at: ${url}`);
