import React, { Component } from "react";
import { auth, db } from "../services/firebase";

class Chats extends Component {
  state = {
    contacts: [],
    chatTitle: "",
    chatMembers: "",
  };

  async componentDidMount() {
    try {
      await db
        .ref("users/" + auth().currentUser.uid)
        .once("value", (snapshot) => {
          let contactsId = Object.keys(snapshot.val().contacts);
          db.ref("users").on("value", (snapshot) => {
            let contacts = contactsId.map((item) => {
              return {
                userId: item,
                name: snapshot.val()[item].userName,
              };
            });
            this.setState({ contacts, isLoading: false });
          });
        });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  handleClick = async (e) => {
    // try {
    //   // if (e.target.dataset.userid)
    //   const newChatKey = db.ref().child("chats").push().key;
    //   this.props.handleActualChat(newChatKey);
    //   await db.ref().update({
    //     [`chats/${newChatKey}`]: {
    //       title: e.target.innerHTML,
    //       lastMessage: "",
    //       timestamp: Date.now(),
    //     },
    //     [`members/${newChatKey}`]: {
    //       [auth().currentUser.uid]: true,
    //       [e.target.dataset.userid]: true,
    //     },
    //     [`users/${auth().currentUser.uid}/chats`]: {
    //       [newChatKey]: true,
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  handleChange = (e) => {
    this.setState({ chatTitle: e.target.value });
  };

  handleSelectChange = (e) => {
    console.log(e.target.value);
    // this.setState({ chatMembers: e.target.dataset.userid });
  };

  handleSubmit = async (e) => {
    // let membersList = {};
    // this.state.chatMembers.forEach((item) => {
    //   membersList[item] = true;
    // });
    e.preventDefault();
    try {
      // if (e.target.dataset.userid)
      const newChatKey = db.ref().child("chats").push().key;
      this.props.handleActualChat(newChatKey);
      await db.ref().update({
        [`chats/${newChatKey}`]: {
          title: this.state.chatTitle,
          lastMessage: "",
          timestamp: Date.now(),
        },
        [`members/${newChatKey}`]: {
          [auth().currentUser.uid]: true,
          [this.state.chatMembers]: true,
        },
        [`users/${auth().currentUser.uid}/chats`]: {
          [newChatKey]: true,
        },
        [`users/${this.state.chatMembers}/chats`]: {
          [newChatKey]: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <h2>Chats</h2>
        <form onSubmit={this.handleSubmit}>
          <button>Create New Chat</button>
          <div>
            <label htmlFor="chat-name">Chat name</label>
            <input id="chat-name" type="text" onChange={this.handleChange} />
          </div>
          Contacts
          <div>
            <select
              name="dadwad"
              // value={this.state.chatMembers}
              id=""
              onChange={this.handleSelectChange}
              multiple
            >
              <option value="dfg">dfg</option>
              {this.state.contacts.map((item) => {
                return (
                  <option
                    value={item.name}
                    // onClick={this.handleClick}
                    key={item.name}
                    data-userid={item.userId}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>

        <ul>
          Chats
          {/* {this.state.chats.map((item) => {
            return (
              <li
                onClick={this.handleClick}
                key={item.name}
                data-userid={item.userId}
              >
                {item.name}
              </li>
            );
          })} */}
        </ul>
      </>
    );
  }
}

export default Chats;
