const posts = [
  {
    id: 2,
    text: "Lorem ipsum",
    user: {
      avatar: "/uploads/avatar1.png",
      username: "Test User"
    }
  },
  {
    id: 1,
    text: "Lorem ipsum",
    user: {
      avatar: "/uploads/avatar2.png",
      username: "Test User 2"
    }
  }
];

const resolvers = {
  RootQuery: {
    posts(root, args, context) {
      return posts;
    }
  },

  // the resolver extracts the post and user objects from the mutations parameters which are passed in the second argument of the function
  // Then, we build the postObject variable
  // the postObject variable now looks like a post from the fake data now
  RootMutation: {
    addPost(root, { post, user }, context) {
      const postObject = {
        ...post,
        user,
        id: posts.length + 1
      };
      posts.push(postObject);
      return postObject;
    }
  }
};

export default resolvers;
