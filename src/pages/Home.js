import React, { Component } from "react";
import Profile from "./Profile";
import Chat from "./Chat";

class Home extends Component {
  render() {
    return (
      <div className="main">
        <div className="chat__container">
          <div className="sidebar">
            <Profile />
          </div>
          <div className="chat__main">
            <div className="chats">chats</div>
            <div className="chat">
              <Chat />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
