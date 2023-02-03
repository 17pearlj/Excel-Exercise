import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import NavBar from "./modules/Navbar/Navbar.js";

import "../utilities.css";
import { Skeleton, Home, NotFound, Form} from "./pages/PageManager.js"
import { socket } from "../client-socket.js";

import { get, post } from "../utilities";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userId: null,
      FirstName: undefined,
      LastName: undefined,
      museums: [],
      path: "",
    };
  }

  async componentDidMount () {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // registed in the database and currently logged in.
        this.setState({ user: user, FirstName: user.firstname, LastName:user.lastname,  userId: user._id },  ()=> {console.log(this.state.FirstName)});
      }
    });
  };

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ 
        user: user, 
        FirstName: user.firstname,
        LastName: user.lastname,
        userId: user._id
      });
     
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ user: null, userId:null,  FirstName:null, LastName:null });
    post("/api/logout");
  };

  render() {
    return (
    <>
      <NavBar
            handleLogin={this.handleLogin.bind(this)}
            handleLogout={this.handleLogout.bind(this)}
            userId={this.state.userId}
            name={this.state.FirstName}
          /> 
      <Router>
        <Skeleton path = "/Welcome"/>
        <Form path="/form" userId={this.state.userId}/>
        <Home path = "/" firstname={this.state.FirstName} lastname={this.state.LastName} userId={this.state.userId}/>
        <NotFound default />
      </Router>
    </>
  );
};
}

export default App;

