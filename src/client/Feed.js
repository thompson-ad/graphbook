import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import "../../assets/css/style.css";

const GET_POSTS = gql`
  {
    posts {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`;

const ADD_POST = gql`
  mutation addPost($post: PostInput!) {
    addPost(post: $post) {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`;

export default class Feed extends Component {
  state = {
    postContent: "",
  };

  handlePostContentChange = (event) => {
    this.setState({ postContent: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      id: this.state.posts.length + 1,
      text: this.state.postContent,
      user: {
        avatar: "/uploads/avatar1.png",
        username: "Fake User",
      },
    };
    this.setState((prevState) => ({
      posts: [newPost, ...prevState.posts],
      postContent: "",
    }));
  };

  render() {
    const self = this;
    const { postContent } = this.state;

    return (
      <Query query={GET_POSTS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return error.message;

          const { posts } = data;
          return (
            <div className="container">
              <div className="postForm">
                <Mutation
                  mutation={ADD_POST}
                  // We only want to add the new post to the cache of the Apollo Client
                  // using the cache helps us to save data by not refetching the entire list.
                  // the update property runs when the GraphQL addPost mutation has finished
                  // The first parameter that it receives is the store of the Apollo client in which the whole cache is saved
                  // The second parameter is the returned response from our graphql API
                  update={(store, { data: { addPost } }) => {
                    const data = store.readQuery({ query: GET_POSTS });
                    data.posts.unshift(addPost);
                    store.writeQuery({ query: GET_POSTS, data });
                  }}
                >
                  {(addPost) => (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addPost({
                          variables: { post: { text: postContent } },
                        }).then(() => {
                          self.setState((prevState) => ({ postContent: "" }));
                        });
                      }}
                    >
                      <textarea
                        value={postContent}
                        onChange={self.handlePostContentChange}
                        placeholder="Write your custom post!"
                      />
                      <input type="submit" value="Submit" />
                    </form>
                  )}
                </Mutation>
              </div>
              <div className="feed">
                {posts.map((post, id) => (
                  <div key={post.id} className="post">
                    <div className="header">
                      <img src={post.user.avatar} />
                      <h2>{post.user.username}</h2>
                    </div>
                    <p className="content">{post.text}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
