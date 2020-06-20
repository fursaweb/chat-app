import React, { Component } from "react";
import { auth, db } from "../services/firebase";

const getNameFromEmail = (email) => {
  return email.split("@")[0];
};

const getFullName = (name, surname) => {
  return `${name} ${surname}`;
};

class Profile extends Component {
  state = {
    name: "",
    surname: "",
    user: {},
    readError: null,
    writeError: null,
    isLoading: true,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ writeError: null });
    try {
      await db
        .ref("users/" + getNameFromEmail(this.state.user.userEmail))
        .update({
          userName: getFullName(this.state.name, this.state.surname),
        });
      this.setState({
        name: "",
        surname: "",
        user: {
          userName: getFullName(this.state.name, this.state.surname),
        },
      });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  };

  async componentDidMount() {
    this.setState({
      readError: null,
    });
    try {
      await db
        .ref("users/" + getNameFromEmail(auth().currentUser.email))
        .once("value", (snapshot) => {
          let user = snapshot.val();
          this.setState({ user, isLoading: false });
        });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading</h1>;
    }

    return (
      <div className="profile">
        <figure className="profile__bio">
          <img className="profile__pic" src={this.state.user.userPic} alt="" />
          <figcaption className="profile__name">
            {this.state.user.userName
              ? this.state.user.userName
              : getNameFromEmail(this.state.user.userEmail)}
          </figcaption>
        </figure>
        <ul className="menu">
          <li className="menu__item">
            <span>Home</span>
          </li>
          <li className="menu__item">
            <span>Chat</span>
          </li>
          <li className="menu__item">
            <span>Contact</span>
          </li>
          <li className="menu__item">
            <span>Notifications</span>
          </li>
          <li className="menu__item">
            <span>Calendar</span>
          </li>
          <li className="menu__item">
            <span>Settings</span>
          </li>
        </ul>
        {/* <form action="" className="profile__form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            <span>Name </span>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="surname">
            <span>Surname </span>
            <input
              type="text"
              name="surname"
              value={this.state.surname}
              onChange={this.handleChange}
            />
          </label>
          <button>Submit</button>
        </form> */}
      </div>
    );
  }
}

export default Profile;
