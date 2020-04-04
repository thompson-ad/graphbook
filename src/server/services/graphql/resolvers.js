import logger from "../../helpers/logger";

export default function resolver() {
  const { db } = this;
  const { Post, User, Chat, Message } = db.models;

  const resolvers = {
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    Message: {
      user(message, args, context) {
        return message.getUser();
      },
      chat(message, args, context) {
        return message.getChat();
      },
    },
    // run getMessages and getUsers to retrieve all joined data
    // all messages are sorted by ID in the ascending order
    Chat: {
      messages(chat, args, context) {
        return chat.getMessages({ order: [["id", "ASC"]] });
      },
      users(chat, args, context) {
        return chat.getUsers();
      },
      lastMessage(chat, args, context) {
        return (
          chat
            .getMessages({ limit: 1, order: [["id", "DESC"]] })
            // need to pull out the value from the array as an array is not a valid response from the schema
            .then((message) => message[0])
        );
      },
    },
    RootQuery: {
      posts(root, args, context) {
        return Post.findAll({ order: [["createdAt", "DESC"]] });
      },
      chat(root, { chatId }, context) {
        return Chat.findById(chatId, {
          include: [
            {
              model: User,
              required: true,
            },
            {
              model: Message,
            },
          ],
        });
      },
      chats(root, args, context) {
        return User.findAll().then((users) => {
          if (!users.length) {
            return [];
          }

          const usersRow = users[0];
          // join all available messages for each chat
          return Chat.findAll({
            include: [
              {
                model: User,
                required: true,
                through: { where: { userId: usersRow.id } },
              },
              {
                model: Message,
              },
            ],
          });
        });
      },
    },
    RootMutation: {
      addPost(root, { post }, context) {
        logger.log({
          level: "info",
          message: "Post was created",
        });
        // we retrieve all users from the db
        return User.findAll().then((users) => {
          const usersRow = users[0];
          // we insert the post into our db with create. We pass the post object from the original request, which only holds the test of the post.
          return Post.create({
            ...post,
            // Set the userId on the post
          }).then((newPost) =>
            Promise.all([newPost.setUser(usersRow.id)]).then(() => newPost)
          );
        });
      },
      addChat(root, { chat }, context) {
        logger.log({
          level: "info",
          message: "Message was created",
        });
        return Chat.create().then((newChat) =>
          // sequelize added the setUsers function to the chat model instance
          // it was added because of the associations using the belongsToMany method in the chat model
          // There we can directly provide an array of user ids that should be associated with the new chat, through the users_chats table
          Promise.all([newChat.setUsers(chat.users)]).then(() => newChat)
        );
      },
      addMessage(root, { message }, context) {
        logger.log({
          level: "info",
          message: "Message was created",
        });

        return User.findAll().then((users) => {
          const usersRow = users[0];

          return Message.create({
            ...message,
          }).then((newMessage) =>
            Promise.all([
              newMessage.setUser(usersRow.id),
              newMessage.setChat(message.chatId),
            ]).then(() => newMessage)
          );
        });
      },
    },
  };
  return resolvers;
}
