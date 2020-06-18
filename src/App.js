import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { auth } from "./services/firebase";
import "./App.scss";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/chat" }} />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    authenticated: false,
    loading: true,
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <h2>Loading...</h2>
    ) : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute
            path="/chat"
            authenticated={this.state.authenticated}
            component={Chat}
          ></PrivateRoute>
          <PrivateRoute
            path="/profile"
            authenticated={this.state.authenticated}
            component={Profile}
          ></PrivateRoute>
          <PublicRoute
            path="/signup"
            authenticated={this.state.authenticated}
            component={Signup}
          ></PublicRoute>
          <PublicRoute
            path="/login"
            authenticated={this.state.authenticated}
            component={Login}
          ></PublicRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;
