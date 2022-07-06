import { buildSchema } from "graphql";

export const schema = buildSchema(`

   type User {
      id: ID
      name: String
      password: String
      letter: String
   }

   type Message {
      id: ID
      message: String
      name: String
   }

   input UserInput {
      name: String!
      password: String!
   }

   input MessageInput {
      name: String!
      message: String!
   }
   type Mutation {
      createUser(input: UserInput): User
      createNewMessage(input: MessageInput): Message
   }
   type Query {
      getAllUsers: [User]
      getUserById(id: ID): User
      getMessagesLimit(limit:Int): [Message]
   }

`)