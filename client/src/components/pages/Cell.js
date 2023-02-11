import React, { Component, useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { get, post } from "../../utilities";


class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          strValue:"",
          value:0,
          expression:props.expression,
          cellReferences:[] // TODO: other cell references
        }
       this.updateCell = this.updateCell.bind(this);
       this.onBlur = this.onBlur.bind(this);
       this.onSelect = this.onSelect.bind(this);
       
    }

  onSelect(e) {
    e.preventDefault();
    this.setState({ strValue:this.state.expression}); 
  }

  updateCell(e) {
    e.preventDefault();
    var expression = e.target.value;
    this.setState({ expression: expression, strValue:expression});
    
  }
  
  onBlur(e) {
    e.preventDefault();
    var parsed = this.props.updateChildCell(this.props.parentId, this.props.id, this.state.expression);
    this.setState({ value:parsed.value, strValue:parsed.strValue})
  }

  render() {
    if (this.props.title) {
      return (<input disabled value={this.state.expression} type="text" />)
    }
    return (
      <input type="text"  value={this.state.strValue} onSelect={this.onSelect} onChange={this.updateCell} onBlur={this.onBlur}/> 
  )};
};

export default Cell;
