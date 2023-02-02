import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";

// render Root
ReactDOM.render(<App />, document.getElementById("root"));

// allows for live updating
module.hot.accept();
