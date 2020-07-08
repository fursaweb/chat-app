import React, { Component } from "react";
import Profile from "./Profile";
import Chats from "./Chats";
import Chat from "./Chat";

class Home extends Component {
  state = {
    actualChat: "",
  };

  handleActualChat = (data) => {
    this.setState({ actualChat: data });
  };

  render() {
    return (
      <div className="main">
        <div className="chat__container">
          <div className="sidebar">
            <Profile />
          </div>
          <div className="chat__main">
            <div className="chats">
              <Chats handleActualChat={this.handleActualChat} />
            </div>
            <div className="chat">
              <Chat actualChatKey={this.state.actualChat} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
