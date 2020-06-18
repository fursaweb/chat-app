import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import { functionFirebase } from "../services/firebase";

//Components
import Message from "../components/Message/Message";
import Test from "../components/Test.tsx";

class Chat extends Component {
  state = {
    user: auth().currentUser,
    chats: [],
    content: "",
    author: "",
    readError: null,
    writeError: null,
  };

  async componentDidMount() {
    this.setState({
      readError: null,
    });
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message });
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
    return (
      <div>
        <div className="chats">
          {this.state.chats.map((chat) => {
            return <Message {...chat} key={chat.timestamp} />;
          })}
        </div>
        <Test text="text text tex " numbr={"wdadwa"} />
        {/* message form */}
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.content} />
          {this.state.error ? <p>{this.state.writeError}</p> : null}
          <button type="submit">Send</button>
        </form>
        <div>
          Login in as: <strong>{this.state.user.email}</strong>
        </div>
      </div>
    );
  }
}

export default Chat;
