import logger from "../../helpers/logger";

export default function resolver() {
  const { db } = this;
  const { Post } = db.models;

  const resolvers = {
    Post: {
      // Posts and Users are two separate tables connected by a foreign key.
      // Previously the RootQuery could return everything we needed as all the information was in one big object
      // now, a second query is needed to collect all necessary data for a complete response
      // This is where the Post entity here comes in
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
