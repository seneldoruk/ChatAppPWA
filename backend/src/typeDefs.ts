const typeDefs = `#graphql
    type User {
        email: String!
        password: String!
    }

    type Message {
        content: String!
        toEmail: String!
        fromEmail: String!
        createdAt: String!
    }

    type Query {
        users: [User] 
        getMessages: [Message]
    }
    type Mutation {
        loginOrRegister(email: String!, password: String!): String
        sendMessage(content: String!, toEmail: String!): Message
    }
`;
export default typeDefs;
