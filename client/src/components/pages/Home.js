import React, { Component, useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { get, post } from "../../utilities";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: props.firstname,
            lastname: props.lastname,
            userId: props.userId,
            visible: false,
            objects: []
        }
        this.toggleObjectVisibility = this.toggleObjectVisibility.bind(this);
    }


  toggleObjectVisibility() {
    const visible = this.state.visible;

    if (!visible) {
      console.log(this.props)
      var str = "api/object/" + this.props.userId; 
      console.log(str);
      let o =  get(str, null).then(
        res => {
          console.log(res);
          this.setState({
            visible: !visible,
            objects: res,
          })
        }
      );


    } else {
      this.setState({
        visible: !visible,
        objects: [],
      })
    }
 
  }
  render() {
    return (
    <>
        <h1>Home Page</h1>
        <h2> Welcome {this.state.firstname} {this.state.lastname}</h2>
      {this.props.userId ?
        (<><Link to="/form"> <button  >Make an object</button></Link>
        <button onClick = {this.toggleObjectVisibility}> {this.state.visible ? "Hide" : "Show"} objects </button>
      {this.state.visible ?  (
      <>
        {this.state.objects.map((value)=> <h3>{value.name}</h3>)}</>
      )  : (<></>) }</>) : (<></>) }
    </>
  )};
};

export default Home;
