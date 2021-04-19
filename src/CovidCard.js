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
      Results As Of:
      {CovidDate}
      <br />
      Total Cases:
      {CovidTotalCases}
      <br />
      News Cases:
      {CovidNewCases}
      <br />
      Total Deaths:
      {CovidTotalDeaths}
      <br />
      New Deaths:
      {CovidNewDeaths}
      <br />
      Total Recovered:
      {CovidTotalRecovered}
      <br />
      New Recovered:
      {CovidNewRecovered}
    </div>
  );
}

export default CovidCard;
