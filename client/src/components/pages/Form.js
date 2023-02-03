import React, { Component, useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { get, post } from "../../utilities";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit() {
    const userId = this.props.userId;
    post("/api/object", { type: 1, name:this.state.name, title:"Home Phone", Description:["Obsolete"], Value:[781, 237, 1776], userId:userId}).then((object) => {
      console.log(object);
    });
  }

  render() {
    return (
    <>
        <h1>Form Page</h1>
        <form onSubmit={this.handleSubmit}>
        <h2> Welcome {this.state.firstname} {this.state.lastname}</h2>
        <input type="text" value={this.state.name} onChange={(e)=>{
            e.preventDefault();
            var name = e.target.value;
            this.setState({name: name})}} />
        <button onClick = {this.toggleObjectVisibility}> {this.state.visible ? "Hide" : "Show"} objects </button>
        </form>
    </>
  )};
};

export default Form;
