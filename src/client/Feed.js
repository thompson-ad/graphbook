import React, { Component } from "react";
import gql from "graphql-tag";
import graphql from "react-apollo";
import "../../assets/css/style.css";

// Query
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
class Feed extends Component {
  state = {
    postContent: ""
  };

  handlePostContentChange = event => {
    this.setState({ postContent: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newPost = {
      id: this.state.posts.length + 1,
      text: this.state.postContent,
      user: {
        avatar: "/uploads/avatar1.png",
        username: "Fake User"
      }
    };
    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts],
      postContent: ""
    }));
  };

  render() {
    const { posts, loading, error } = this.props;
    const { postContent } = this.state;

    if (loading) {
      return "loading";
    }

    if (error) {
      return error.message;
    }

    return (
      <div className="container">
        <div className="postForm">
          <form onSubmit={this.handleSubmit}>
            <textarea
              value={postContent}
              onChange={this.handlePostContentChange}
              placeholder="Write your custom post!"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="feed">
          {posts.map((post, i) => (
            <div key={post.id} className="post">
              <div className="header">
                <img src={post.user.avatar} alt="user" />
                <h2>{post.user.username}</h2>
              </div>
              <p className="content">{post.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Graphql accepts the query as the first parameter
// the second parameter allows is to map the result of the HoC to specific properties of the child component
// the post, loading and error parameters are passed as properties to the feed component
export default graphql(GET_POSTS, {
  props: ({ data: { loading, error, posts } }) => ({ loading, posts, error })
})(Feed);
