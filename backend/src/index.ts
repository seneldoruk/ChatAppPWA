import {ApolloServer,} from "@apollo/server";
import typeDefs from "./typeDefs.js";
import "dotenv/config";
import {jwtSecret, mutations, queries} from "./resolvers.js";
import {expressMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
// @ts-ignore
import https from "https-localhost";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

const app = https()

const resolvers = {
    Query: queries,
    Mutation: mutations,
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});
await server.start();
app.use('/', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, {
    context: async ({req, res}) => {
        const token = req.headers.authorization || "";
        try {
            const email = (jwt.verify(token, jwtSecret) as any).email;
            return {email};
        } catch {
            return {};
        }
    },

}));
app.listen(8000).then(() => {
    console.log('🚀 Server ready at', `https://localhost:8000/`);
    console.log('Connected to DB at', process.env.DATABASE_URL)
})

