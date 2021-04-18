import React from "react";
// import { App } from "./App.js";
// import './Covid_Cards.css';

export function Covid_Card(props) {
  return (
    <div className="Covid_Card" >
      {props.Covid_Date}
      <br/>
      {props.Covid_TotalCases}
      <br/>
      {props.Covid_NewCases}
      <br/>
      {props.Covid_TotalDeaths}
      <br/>
      {props.Covid_NewDeaths}
      <br/>
      {props.Covid_TotalRecovered}
      <br/>
      {props.Covid_NewRecovered}
    </div>
  );
}

export default Covid_Card;