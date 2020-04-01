const typeDefinitions = `
  type User {
    id: Int
    avatar: String
    username: String
  }

  type Post {
    id: Int
    text: String
    user: User
  }

  input PostInput {
    text: String!
  }

  type Message {
    id: Int
    text: String
    chat: Chat
    user: User
  }

  input MessageInput {
    text: String!
    chatId: Int!
  }

  type Chat {
    id: Int
    messages: [Message]
    users: [User]
  }

  input ChatInput {
    users: [Int]
  }
  
  input UserInput {
    username: String!
    avatar: String!
  }
  
  type RootMutation {
    addPost (
      post: PostInput!
    ): Post
    addChat (
      chat: ChatInput!
    ): Chat
    addMessage (
      message: MessageInput!
    ): Message
  }

  type RootQuery {
    posts: [Post]
    chats: [Chat]
    chat(chatId: Int): Chat
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];
