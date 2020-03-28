const typeDefinitions = `
  type User {
    avatar: String
    username: String
  }

  type Post {
    id: Int
    text: String
    user: User
  }

  type RootQuery {
    posts: [Post]
  }

  schema {
    query: RootQuery
  }
`;

export default [typeDefinitions];
