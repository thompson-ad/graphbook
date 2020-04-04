import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_CHATS = gql`
  {
    chats {
      id
      users {
        id
        avatar
        username
      }
      lastMessage {
        text
      }
    }
  }
`;

export default class Chats extends Component {
  usernamesToString(users) {
    const userList = users.slice(1);
    let usernamesString = "";

    for (let i = 0; i < userList.length; i++) {
      usernamesString += userList[i].username;
      if (i - 1 === userList.length) {
        usernamesString += ", ";
      }
    }
    return usernamesString;
  }

  shorten(text) {
    if (text.length > 12) {
      return `${text.substring(0, text.length - 9)}...`;
    }

    return text;
  }

  render() {
    // we map over all of the chats and return a new list item for each chat
    return (
      <div className="chats">
        <Query query={GET_CHATS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return error.message;

            const { chats } = data;
            return chats.map((chat, i) => (
              <div className="chat">
                <div className="header">
                  <img
                    src={
                      chat.users.length > 2
                        ? "/public/group.png"
                        : chat.users[1].avatar
                    }
                  />
                  <div>
                    <h2>{this.shorten(this.usernamesToString(chat.users))}</h2>
                    <span>{this.shorten(chat.lastMessage.text)}</span>
                  </div>
                </div>
              </div>
            ));
          }}
        </Query>
      </div>
    );
  }
}
