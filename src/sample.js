import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { socket } from './App.js';
import PropTypes from 'prop-types';
import Tile from './Tile';

// Note all props values will be gotten from the socketio values in the future. These are just dummy values.
export function Sample(props) {
    const { forecast } = props;
    return (
        
    <div className="Weather_div">    
        <div className="Weather_Wrapper">
            <div className = "current">
                <h2>{forecast[0][0]}</h2>
                <h3>Currently: {forecast[0][1]}°</h3>
                <h3>{forecast[0][2]}</h3>
                <img src={forecast[0][3]} alt="weather" className="weather_icon" />
            </div>
            <div className="Horiz_line"></div>
            <div className ="forecast">
                <div className="day_1"><Tile day={forecast[1][1]} date={forecast[1][0]} high={forecast[1][2]} low={forecast[1][3]} weather={forecast[1][4]} icon={forecast[1][5]}/></div>
                <div className="day_2"><Tile day={forecast[2][1]} date={forecast[2][0]} high={forecast[2][2]} low={forecast[2][3]} weather={forecast[2][4]} icon={forecast[2][5]}/></div>
                <div className="day_3"><Tile day={forecast[3][1]} date={forecast[3][0]} high={forecast[3][2]} low={forecast[3][3]} weather={forecast[3][4]} icon={forecast[3][5]}/></div>
                <div className="day_4"><Tile day={forecast[4][1]} date={forecast[4][0]} high={forecast[4][2]} low={forecast[4][3]} weather={forecast[4][4]} icon={forecast[4][5]}/></div>
                <div className="day_5"><Tile day={forecast[5][1]} date={forecast[5][0]} high={forecast[5][2]} low={forecast[5][3]} weather={forecast[5][4]} icon={forecast[5][5]}/></div>
            </div>
            <br />
        </div>
    </div>
    );
}
Sample.propTypes = {
  forecast: PropTypes.array.isRequired,
};

export default Sample;