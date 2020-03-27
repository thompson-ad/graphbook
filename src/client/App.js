import React, { Component } from "react";

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

// you might also see this as
// class App extends React.Component
export default class App extends Component {
  state = {
    posts: posts
  };

  // the old way of doing it before we had destructuring was with a constrcutor
  //   // the class is going to be constructed with properties
  //   constructor(props) {
  //     // these properties must be handed up to the parent comoponent
  //     super(props);

  //     this.state = {
  //       posts
  //     };
  //   }

  // the hard requirement of every class based react component is that it must have a render method
  render() {
    // we are extracting the posts we want to render from the components state
    const { posts } = this.state;
    // render the data
    // we iterate over the posts array with map
    //
    return (
      <div className="container">
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
