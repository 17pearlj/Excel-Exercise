import React, { Component, useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import { get, post } from "../../utilities";
import Row from "./Row";
const Parser = require('expr-eval').Parser;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.updateChildCell = this.updateChildCell.bind(this);
        var rows = []
        rows.push(<Row title={true} key={-1}/>)
        for (var i = 0; i < 24; i++) {
          rows.push(<Row title={false} key={i} id={i} updateChildCell={this.updateChildCell}/>)
        }
        
        this.state = {
          rows:rows,
          values: Array(24).fill(0).map(row => new Array(12).fill(0)),
        }
        
    }
  
  getSum(expression) {
    var val = 0;
    var buildStr = "";
    for (var i = 5; i < expression.length - 1; i++) {
      if (expression[i] != ',') {
        buildStr += expression[i];
      } else {
        let buildStrVal = parseInt(buildStr);
        if (isNaN(buildStrVal)) {
          buildStrVal = this.getCellVal(buildStr);
          if (isNaN(buildStrVal)) {
            return {value:0, strValue: expression};
          }
        } 
        val += buildStrVal;
        buildStr = ""; 
      }
    }
    let buildStrVal = parseInt(buildStr);
    if (isNaN(buildStrVal)) {
      buildStrVal = this.getCellVal(buildStr);
      if (isNaN(buildStrVal)) {
        return {value:0, strValue: expression};
      }
    } 
    val += buildStrVal;
    return {value:val, strValue: String(val)};;
  }


  getSumRange(expression) {
    let startCode = "";
    let endCode = "";
    let i = 5;
    for (; i < expression.length - 1; i++) {
      if (expression[i] == ":") {i++; break;}
      startCode += expression[i];
    } 
    for (; i < expression.length - 1; i++) {
      endCode += expression[i];
    } 
    let colId1 = startCode.charCodeAt(0) - 65;
    let colId2 = endCode.charCodeAt(0) - 65;
    var lowColId = Math.min(colId1, colId2);
    var highColId = Math.max(colId1, colId2);

    let rowId1 = parseInt(startCode.substring(1));
    let rowId2 = parseInt(endCode.substring(1));
    var lowRowId = Math.min(rowId1, rowId2);
    var highRowId = Math.max(rowId1, rowId2);

    if (colId2 >= 12 || colId2 >= 12 || rowId2 >= 24 || rowId2 >= 24) {
      return {value:Nan, strValue: expression};;
    }
    var summedVal = 0;
    for (var r = lowRowId; r <= highRowId; r++) {
      for (var c = lowColId; c <= highColId; c++) {
        summedVal += this.state.values[r][c];
      }
    }
    return {value:summedVal, strValue: String(summedVal)};;
  }

  getCellCode(parentId, childId) {
    return String.fromCharCode(65 + childId) + String(parentId);
  }

  getCellVal(cellCode) {
    let colId = cellCode.charCodeAt(0) - 65;
    let rowId = parseInt(cellCode.substring(1));
    if (rowId < 24 && colId < 12) {
      return this.state.values[rowId][colId];
    } else {
      return NaN;
    }
    
  }


  parseExpression(expression) {

    if (expression[0] != '=') {
      return {value: parseInt(expression), strValue: expression};
    } else {
      if (expression.length > 4 && expression.substring(1,4) == "SUM") { 
        if (expression.length > 8 && (expression[6] == ':' || expression[7] == ':')) {
          return this.getSumRange(expression);
        }
        return this.getSum(expression);
      }
      var expressionSub = expression.substring(1);
      const parser = new Parser();
      try {

        let expr = parser.parse(expressionSub);
        let variables = expr.variables();

        let dict = {};
        var references = [];
        for (var v = 0; v < variables.length; v++) {
          var cellVal = this.getCellVal(variables[v]);

          if (!isNaN(cellVal)) {
            dict[variables[v]] = cellVal;
            references.push(variables[v]);
          }
        }
        let val = expr.evaluate(dict);
        return {value: val, strValue: String(val), references:references};
      } catch {

        return {value: 0, strValue: expression};
      }

    }
    
  }

  updateChildCell(parentId, childId, expression) {
    var values = this.state.values;
    var parsed = this.parseExpression(expression);
    values[parentId][childId] = parsed.value;

    
    var references = this.state.references;
    if (parsed.references) {
      for (var i = 0; i < parsed.references.length; i++) {
        parsed.references[i]
      }
    }
    this.setState({values:values})
    return parsed;
  }

  render() {
    return (
    <>
        {this.state.rows.map((value)=><> {value}</> )}
    </>
  )};
};

export default Home;
