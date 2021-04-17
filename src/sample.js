import React from 'react';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import PropTypes from 'prop-types';
import Tile from './Tile';

// Note all props values will be gotten from the socketio values in the future. These are just dummy values.
export function Sample(props) {
    const { forecast } = props;
    return (
    <div>
        <div className = "current">
            <h2>{forecast[0][0]}</h2>
            <h3>Currently: 57°</h3>
            <h3>Insert Weather Here</h3>
            <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather" />
        </div>
        <div className ="forecast">
            <Tile day={"Monday"} date={"04/19"} high={"10"} low={"5"} weather="Cloudy" icon={"https://openweathermap.org/img/wn/10d@2x.png"}/>
            <Tile day={"Monday"} date={"04/19"} high={"10"} low={"5"} weather="Cloudy" icon={"https://openweathermap.org/img/wn/10d@2x.png"}/>
            <Tile day={"Monday"} date={"04/19"} high={"10"} low={"5"} weather="Cloudy" icon={"https://openweathermap.org/img/wn/10d@2x.png"}/>
            <Tile day={"Monday"} date={"04/19"} high={"10"} low={"5"} weather="Cloudy" icon={"https://openweathermap.org/img/wn/10d@2x.png"}/>
            <Tile day={"Monday"} date={"04/19"} high={"10"} low={"5"} weather="Cloudy" icon={"https://openweathermap.org/img/wn/10d@2x.png"}/>
        </div>
        <br />
    </div>
    );
}
Sample.propTypes = {
  forecast: PropTypes.array.isRequired,
};

export default Sample; 