import React, { Component, useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
//import { Dropdown } from "react-bootstrap";
import { get } from "../../../utilities";

import "./Navbar.css";
//import { Button } from "semantic-ui-react";

//const GOOGLE_CLIENT_ID = "739429176548-tsa0p9g06lqtakr3p0ifjfcde6jnpqhj.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {linkClassName: "NavBar-link"};
    }

  
  render() {
    return (
    <nav className="NavBar">
      <div className="NavBar-links">

        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-login Navbar-item"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={(res) => this.props.handleLogin(res)}
            onFailure={(err) => console.log(err)}
            className="NavBar-login Navbar-item"
          />
        )}

        <Link to="/Welcome" className={this.state.linkClassName}>
          Welcome
        </Link>
        {this.props.userId ? 
        <> 
        <Link to="/" className={this.state.linkClassName}>
          {this.props.name}  Home
        </Link> 
        
        <Link to="/generic" className={this.state.linkClassName}>
          Generic Page
        </Link>
        <Link to="/generic_form" className={this.state.linkClassName}>
          Generic Form
        </Link> </>
        : <></>}

        </div> 
    </nav>
  )};
};

export default NavBar;