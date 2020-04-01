import logger from "../../helpers/logger";

export default function resolver() {
  const { db } = this;
  const { Post, User } = db.models;

  const resolvers = {
    Post: {
      user(post, args, context) {
        return post.getUser();
      }
    },
    RootQuery: {
      posts(root, args, context) {
        return Post.findAll({ order: [["createdAt", "DESC"]] });
      }
    },
    RootMutation: {
      addPost(root, { post }, context) {
        logger.log({
          level: "info",
          message: "Post was created"
        });
        // we retrieve all users from the db
        return User.findAll().then(users => {
          const usersRow = users[0];
          // we insert the post into our db with create. We pass the post object from the original request, which only holds the test of the post.
          return Post.create({
            ...post
            // Set the userId on the post
          }).then(newPost =>
            Promise.all([newPost.setUser(usersRow.id)]).then(() => newPost)
          );
        });
      }
    }
  };
  return resolvers;
}
