import React, { Component, useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: props.firstname,
            lastname: props.lastname,
        }
    }

  
  render() {
    return (
    <>
        <h1>Home Page</h1>
        <h2> Welcome {this.state.firstname} {this.state.lastname}</h2>
    </>
  )};
};

export default Home;