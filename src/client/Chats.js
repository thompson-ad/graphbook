import React, { Component } from "react";

// get some fake data to play with from Apollo client
const chats = [
  {
    id: 1,
    users: [
      {
        avatar: "/uploads/avatar1.png",
        username: "TestUser",
      },
      {
        avatar: "/uploads/avatar2.png",
        username: "TestUser2",
      },
    ],
    lastMessage: {
      id: 4,
      text: "you just added a message",
    },
  },
  {
    id: 2,
    users: [
      {
        avatar: "/uploads/avatar1.png",
        username: "TestUser",
      },
      {
        avatar: "/uploads/avatar2.png",
        username: "TestUser2",
      },
    ],
    lastMessage: {
      id: 4,
      text: "you just added a message",
    },
  },
];

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
        {chats.map((chat, i) => (
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
        ))}
      </div>
    );
  }
}
