import React from "react";
import { App } from "./App.js";
// import './News_Cards.css';

export function News_Card(props) {
  return (
    <div className="News_Card" >
      {props.News_Headlines}
      {props.News_Info}
      {props.News_Date}
      {props.News_Url}
      {props.News_Author}
    </div>
  );
}

export default News_Card;
