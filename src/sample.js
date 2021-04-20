import './App.css';
import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

export function Sample(props) {
  const { forecast } = props;
  return (
    <div>
      <div className="current">
        <h2>{forecast[0][0]}</h2>
        <h3>
          Currently:
          {forecast[0][1]}
          °
        </h3>
        <h3>{forecast[0][2]}</h3>
        <img src={forecast[0][3]} alt="weather" />
      </div>
      <div className="forecast">
        <Tile
          day={forecast[1][1]}
          date={forecast[1][0]}
          high={forecast[1][2]}
          low={forecast[1][3]}
          weather={forecast[1][4]}
          icon={forecast[1][5]}
        />
        <Tile
          day={forecast[2][1]}
          date={forecast[2][0]}
          high={forecast[2][2]}
          low={forecast[2][3]}
          weather={forecast[2][4]}
          icon={forecast[2][5]}
        />
        <Tile
          day={forecast[3][1]}
          date={forecast[3][0]}
          high={forecast[3][2]}
          low={forecast[3][3]}
          weather={forecast[3][4]}
          icon={forecast[3][5]}
        />
        <Tile
          day={forecast[4][1]}
          date={forecast[4][0]}
          high={forecast[4][2]}
          low={forecast[4][3]}
          weather={forecast[4][4]}
          icon={forecast[4][5]}
        />
        <Tile
          day={forecast[5][1]}
          date={forecast[5][0]}
          high={forecast[5][2]}
          low={forecast[5][3]}
          weather={forecast[5][4]}
          icon={forecast[5][5]}
        />
      </div>
      <br />
    </div>
  );
}
Sample.propTypes = {
  forecast: PropTypes.string.isRequired,
};

export default Sample;
