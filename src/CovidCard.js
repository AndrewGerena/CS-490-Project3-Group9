/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
// import './Covid_Cards.css';

export function CovidCard(props) {
  return (
    <div className="Covid_Card"><span><u>Results As Of:</u></span>&nbsp;
      <i className="Date">{props.Covid_Date}</i>
      <br />
      <span><u>Cases:</u></span>&nbsp;
      <i className="TotalCases">{props.Covid_TotalCases}</i>
      <br />
      <span><u>News Cases:</u></span>&nbsp;
      <i className="NewCases">{props.Covid_NewCases}</i>
      <br />
      <span><u>Deaths:</u></span>&nbsp;
      <i className="TotalDeaths">{props.Covid_TotalDeaths}</i>
      <br />
      <span><u>New Deaths:</u></span>&nbsp;
      <i className="NewDeaths">{props.Covid_NewDeaths}</i>
      <br />
      <span><u>Recovered:</u></span>&nbsp;
      <i className="TotalRecovered">{props.Covid_TotalRecovered}</i>
      <br />
      <span><u>New Recovered:</u></span>&nbsp;
      <i className="NewRecovered">{props.Covid_NewRecovered}</i>
    </div>
  );
}

export default CovidCard;
