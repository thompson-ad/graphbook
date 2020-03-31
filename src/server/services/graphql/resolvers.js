import logger from "../../helpers/logger";

// cannot use arrow syntax as we used .call
// an alternative way to do it would be to hand over the utils object as a parameter
export default function resolver() {
  const { db } = this;
  const { Post } = db.models;

  const resolvers = {
    RootQuery: {
      posts(root, args, context) {
        return Post.findAll({ order: [["createdAt", "DESC"]] });
      }
    },
    RootMutation: {
      addPost(root, { post, user }, context) {
        const postObject = {
          ...post,
          user,
          id: post.length + 1
        };
        post.push(postObject);
        logger.log({ level: "info", message: "Post was created" });
        return postObject;
      }
    }
  };
  return resolvers;
}
