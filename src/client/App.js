import React, { Component } from "react";
import "../../assets/css/style.css";

// some fake post data
const posts = [
  {
    id: 2,
    text: "lorem ipsum",
    user: {
      avatar: "/uploads/avatar1.png",
      username: "Test User"
    }
  },
  {
    id: 1,
    text: "lorem ipsum",
    user: {
      avatar: "/uploads/avatar2.png",
      username: "Test User 2"
    }
  }
];

export default class App extends Component {
  state = {
    posts: posts,
    postContent: ""
  };

  // we need a function that handle the internal react state of the post content since the components state is not directly linked to the DOM
  handlePostContentChange = event => {
    this.setState({ postContent: event.target.value });
  };

  // older way is like
  // handlePostContentChange(event) {
  //   this.setState({ postContent: event.target.value });
  // }

  // in the constructor
  // this.handlePostContentChange = this.handlePostContentChange.bind(this)

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
    // this is an update function
    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts],
      postContent: ""
    }));
  };

  render() {
    const { posts, postContent } = this.state;
    return (
      <div className="container">
        <div className="postForm">
          <form onSubmit={this.handleSubmit}>
            {/* we are passing the postContent variable to the value property of the text area to have what is called a controlled component */}
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
