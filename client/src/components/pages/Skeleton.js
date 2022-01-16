import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      {userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
        />
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
        />
      )}
      <h1>Website Skeleton</h1>
      <h2> Things change in this skeleton</h2>
      <ul>
        <li>
          Change the Frontend CLIENT_ID (Skeleton.js) to your site's CLIENT_ID (obtain this at
            https://docs.google.com/presentation/d/1AtpdVt3i0XagF9rNwtLoP-UV8DX38ZtEBO3ED2MNZdM/edit?usp=sharing)
        </li>
        <li>Change the Server CLIENT_ID to the same CLIENT_ID (auth.js)</li>
        <li>
          Change the Database SRV (mongoConnectionURL) for Atlas (server.js). Learn about MongoDB setup: https://docs.google.com/presentation/d/1augiH6P3wBXoTcM2HidDC7paPPkdmep1a28ZV7VnxaM/edit?usp=sharing.
        </li>
        <li>Change the Database Name for MongoDB to whatever you put in the SRV (server.js)</li>
      </ul>
      <h2>How to go from this skeleton to our actual app</h2>
      <a href="https://docs.google.com/document/d/1R_SxRirzaWk42CzhP0Jch9h0yV68Odte16fbjm7uKgE/edit?usp=sharing">Check out this getting started guide</a>
    </>
  );
};

export default Skeleton;
