import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

//Components
import Message from "../components/Message/Message";

import { getNameFromEmail } from "../helpers/utils";

class Chat extends Component {
  state = {
    user: auth().currentUser,
    chats: [],
    content: "",
    author: "",
    readError: null,
    writeError: null,
    chat: {},
  };

  componentDidMount() {}

  // oneTimeFunc = async () => {
  //   try {
  //     await db.ref("users/" + auth().currentUser.uid).set({
  //       userEmail: auth().currentUser.email,
  //       userName: getNameFromEmail(auth().currentUser.email),
  //       userId: auth().currentUser.uid,
  //       userPic: "",
  //     });
  //   } catch (error) {
  //     this.setState({ error: error.message });
  //   }
  // };

  async componentDidUpdate(prevProps) {
    try {
      await db
        .ref(`chats/${this.props.actualChatKey}`)
        .on("value", (snapshot) => {
          if (this.props.actualChatKey !== prevProps.actualChatKey) {
            this.setState({ chat: snapshot.val() });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className="chat-wrapper">
        <div className="chat__header">
          <figure className="chat__bio">
            <img src="" alt="" className="chat__userpic" />
            <figcaption className="chat__info">
              <span className="chat__name">
                {this.state.chat.title || "choose chat"}
              </span>
              <span className="chat__extra">last online 5 hours ago</span>
            </figcaption>
          </figure>
          <div className="chat__btn-set">
            <button className="chat__btn chat__btn--white">+</button>
            <button className="chat__btn chat__btn--white">...</button>
          </div>
        </div>
        <div className="chat__body">
          {this.state.chats.map((chat) => {
            return <Message {...chat} key={chat.timestamp} />;
          })}
        </div>
        <div className="chat__footer">
          <form className="chat__form" onSubmit={this.handleSubmit}>
            <input
              placeholder="Type a message here"
              onChange={this.handleChange}
              value={this.state.content}
            />
            {this.state.error ? <p>{this.state.writeError}</p> : null}
            <button
              type="submit"
              className="chat__btn chat__btn--blue chat__btn--sm"
            >
              ~
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
