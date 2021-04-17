import React from "react";
import { App } from "./App.js";
import './News_Cards.css';

export function News_Card(props) {
  return (
	 <div className="grid">
		<div className="grid-item">
			<div className="card">
				<img className="card-img" src="#Image" alt="NEWS IMAGE"/>
				<div className="card-content">
					<h1 className="card-header">NEWS #1</h1>
					<p className="card-text">
						{props.News_Info[0]}
					</p>
					<button class="card-btn">Read NEWS</button>
				</div>
			</div>
		</div>
	</div>
  );
}

export default News_Card;




      // {props.News_Headlines}
      // {props.News_Info}
      // {props.News_Date}
      // {props.News_Url}
      // {props.News_Author}
      
      
  //     			<div class="News_Card">
		// 			<div class="News_Card-image"><img src="#none" alt=""/></div>
		// 				<div class="News_Card-txt">
		// 					<h2>Heading Will Be Here</h2>
		// 					<p>Lorem, ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur aspernatur reprehenderit velit est voluptatum, voluptas amet quasi dicta consectetur.</p>
		// 					<ul>
		// 					  <li><i class="fa fa-calendar" aria-hidden="true"></i> Sep 19, 2020</li>
		// 					  <li><i class="fa fa-user" aria-hidden="true"></i> Admin</li>
		// 					</ul>
		// 					<a href="#">Read More...</a>
		// 			</div>
		// 	</div>