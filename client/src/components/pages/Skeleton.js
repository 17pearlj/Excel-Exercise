import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE CLIENT_ID
//const GOOGLE_CLIENT_ID = "739429176548-tsa0p9g06lqtakr3p0ifjfcde6jnpqhj.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";


const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <h1>Website Skeleton</h1>
      <h2> Welcome to the project</h2>
      <ul>
        <li>
          Checkout api, models, controllers for database interactions
        </li>
        <li>Checkout client components for React classes and forms</li>
        <li>
          Checkout ___ for api usage
        </li>
      </ul>
    </>
  );
};

export default Skeleton;
