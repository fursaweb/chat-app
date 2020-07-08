import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup, signInWithGoogle } from "../helpers/auth";
import { db, auth } from "../services/firebase";
import { getNameFromEmail } from "../helpers/utils";

class Signup extends Component {
  state = {
    error: null,
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "" });
    try {
      await signup(this.state.email, this.state.password).then((user) =>
        db.ref("users/" + auth().currentUser.uid).set({
          userEmail: auth().currentUser.email,
          userName: getNameFromEmail(auth().currentUser.email),
          userId: auth().currentUser.uid,
          userPic: "",
        })
      );
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  };

  googleSignIn = async () => {
    try {
      await signInWithGoogle().then(() => {
        db.ref("users/" + auth().currentUser.uid).set({
          userEmail: auth().currentUser.email,
          userName: getNameFromEmail(auth().currentUser.email),
          userId: auth().currentUser.uid,
          userPic: "",
        });
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>
            Sign Up to
            <Link to="/">Chatty</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            ></input>
          </div>
          <div>
            <input
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            ></input>
          </div>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button type="submit">Sign up</button>
            <p>Or</p>
            <button onClick={this.googleSignIn} type="button">
              Sign up with Google
            </button>
          </div>
          <hr></hr>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;
