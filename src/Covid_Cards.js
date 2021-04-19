import React from "react";
import { App } from "./App.js";
// import './Covid_Cards.css';

export function Covid_Card(props) {
  return (
    <div className="Covid_Card" >Results As Of: {props.Covid_Date}
      <br/>
      Total Cases: {props.Covid_TotalCases}
      <br/>
      News Cases: {props.Covid_NewCases}
      <br/>
      Total Deaths: {props.Covid_TotalDeaths}
      <br/>
      New Deaths: {props.Covid_NewDeaths}
      <br/>
      Total Recovered: {props.Covid_TotalRecovered}
      <br/>
      New Recovered: {props.Covid_NewRecovered}
    </div>
  );
}

export default Covid_Card;