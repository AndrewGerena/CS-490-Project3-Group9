import React from 'react';
// import './Covid_Cards.css';

export function CovidCard({
  CovidDate,
  CovidTotalCases,
  CovidNewCases,
  CovidTotalDeaths,
  CovidNewDeaths,
  CovidTotalRecovered,
  CovidNewRecovered,
}) {
  return (
    <div className="Covid_Card">
      <span><u>Results As Of:</u></span>
&nbsp;
      <i className="Date">{CovidDate}</i>
      <br />
      <span><u>Cases:</u></span>
&nbsp;
      <i className="TotalCases">{CovidTotalCases}</i>
      <br />
      <span><u>News Cases:</u></span>
&nbsp;
      <i className="NewCases">{CovidNewCases}</i>
      <br />
      <span><u>Deaths:</u></span>
&nbsp;
      <i className="TotalDeaths">{CovidTotalDeaths}</i>
      <br />
      <span><u>New Deaths:</u></span>
&nbsp;
      <i className="NewDeaths">{CovidNewDeaths}</i>
      <br />
      <span><u>Recovered:</u></span>
&nbsp;
      <i className="TotalRecovered">{CovidTotalRecovered}</i>
      <br />
      <span><u>New Recovered:</u></span>
&nbsp;
      <i className="NewRecovered">{CovidNewRecovered}</i>
    </div>
  );
}

export default CovidCard;
