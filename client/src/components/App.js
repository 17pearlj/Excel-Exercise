import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";


import "../utilities.css";

import Home from "./pages/Home.js";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "",
    };
  }



  render() {
    return (
    <>
      <Router>
        <Home path = "/"/>
      </Router>
    </>
  );
};
}

export default App;

