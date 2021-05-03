import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

function Tile(props) {
  const { day } = props;
  const { date } = props;
  const { high } = props;
  const { low } = props;
  const { icon } = props;
  const { weather } = props;

  return (
    <div className="day">
      <h4 className="Weather_Day">{day}</h4>
      <p className="Weather_Date">{date}</p>
      <p className="Weather_Temp">
        {high}
        ° /
        {' '}
        {low}
        °
      </p>
      <p className="Weather_Num">{weather}</p>
      <img src={icon} alt="Icon" className="Weather_Icon" />
    </div>
  );
}

Tile.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  high: PropTypes.string.isRequired,
  low: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export { Tile as default };
