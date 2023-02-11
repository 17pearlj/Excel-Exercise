import React, { Component, useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { get, post } from "../../utilities";
import Cell from "./Cell";

class Row extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        var cells = []
        if (this.props.title) {
            cells.push(<Cell title={true} key={-1} expression={""}/>)
            for (var i = 0; i < 12; i++) {
                cells.push(<Cell title={true} key={i} expression={String.fromCharCode(65 + i)}/>)
            }
        } else {
            cells.push(<Cell title={true} key={-1} expression={String(this.props.id)}/>)
            for (var i = 0; i < 12; i++) {
                cells.push(<Cell title={false} key={i} id={i} expression={""} parentId={this.props.id} updateChildCell={this.props.updateChildCell}/>)
            } 
        }

        this.state = {
          cells:cells,
          key:props.key,
        }
    }


  render() {
    return (
    <div class="row">
        {this.state.cells.map((value)=><> {value}</> )}
    </div>
  )};
};

export default Row;
