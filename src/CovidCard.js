import React from 'react';
import PropTypes from 'prop-types';
import './Covid_Cards.css';

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

CovidCard.propTypes = {
  CovidDate: PropTypes.string.isRequired,
  CovidTotalCases: PropTypes.string.isRequired,
  CovidNewCases: PropTypes.string.isRequired,
  CovidTotalDeaths: PropTypes.string.isRequired,
  CovidNewDeaths: PropTypes.string.isRequired,
  CovidTotalRecovered: PropTypes.string.isRequired,
  CovidNewRecovered: PropTypes.string.isRequired,
};

export default CovidCard;
