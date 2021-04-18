import React from "react";
import { App } from "./App.js";
import './News_Cards.css';

export function News_Card(props) {
	 let news_url_0=props.News_Url[0];
	 console.log(news_url_0)
	 let news_url_1=props.News_Url[1];
	 console.log(news_url_1)
	 let news_url_2=props.News_Url[2];
	 console.log(news_url_2)
	 let news_url_3=props.News_Url[3];
	 console.log(news_url_3)
  return (
	<html lang="en">
	  <head>
	    <meta charset="UTF-8" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	    <title>Document</title>
	    <link rel="stylesheet" href="./News.css" />
	  </head>
	  <body>
	      <div class="section-center">
		      <article class="News-card">
		        <div class="News-img-container">
		          <img
		            src="https://image.freepik.com/free-vector/breaking-news-background-with-world-map-backdrop-global-connectivity-line-headline-bar-modern-futuristic-news-template_35632-197.jpg"
		            alt="News Image"
		            class="News-img"
		          />
		          <p class="News-date">{props.News_Date[0]}</p>
		        </div>
		        <div class="News-info">
		          <h4 class="Title">{props.News_Headlines[0]}</h4>
		          <p class="Description_P">
					{props.News_Info[0]}
		          </p>
		          <div class="News-footer">
		            <p>
		              <span>
						{props.News_Author[0]}
		              </span>
		            </p>
		          </div>
		        </div>
		        <button class="News_Article_Link"><a  class="Link_Attch" href={news_url_0} target="_blank">Read More</a></button>
		      </article>
		      <article class="News-card">
		        <div class="News-img-container">
		          <img
		            src="https://image.freepik.com/free-vector/breaking-news-background-with-world-map-backdrop-global-connectivity-line-headline-bar-modern-futuristic-news-template_35632-197.jpg"
		            alt="News Image"
		            class="News-img"
		          />
		          <p class="News-date">{props.News_Date[1]}</p>
		        </div>
		        <div class="News-info">
		          <h4>{props.News_Headlines[1]}</h4>
		          <p class="Description_P">
					{props.News_Info[1]}
		          </p>
		          <div class="News-footer">
		            <p>
		              <span>
						{props.News_Author[1]}
		              </span>
		            </p>
		          </div>
		        </div>
		        <button class="News_Article_Link"><a  class="Link_Attch" href={news_url_1} target="_blank">Read More</a></button>
		      </article>
		      <article class="News-card">
		        <div class="News-img-container">
		          <img
		            src="https://image.freepik.com/free-vector/breaking-news-background-with-world-map-backdrop-global-connectivity-line-headline-bar-modern-futuristic-news-template_35632-197.jpg"
		            alt="News Image"
		            class="News-img"
		          />
		          <p class="News-date">{props.News_Date[2]}</p>
		        </div>
		        <div class="News-info">
		          <h4>{props.News_Headlines[2]}</h4>
		          <p class="Description_P">
					{props.News_Info[2]}
		          </p>
		          <div class="News-footer">
		            <p>
		              <span>
						{props.News_Author[2]}
		              </span>
		            </p>
		          </div>
		        </div>
		        <button class="News_Article_Link"><a class="Link_Attch" href={news_url_2} target="_blank">Read More</a></button>
		      </article>
		      <article class="News-card">
		        <div class="News-img-container">
		          <img
		            src="https://image.freepik.com/free-vector/breaking-news-background-with-world-map-backdrop-global-connectivity-line-headline-bar-modern-futuristic-news-template_35632-197.jpg"
		            alt="News Image"
		            class="News-img"
		          />
		          <p class="News-date">{props.News_Date[3]}</p>
		        </div>
		        <div class="News-info">
		          <h4>{props.News_Headlines[3]}</h4>
		          <p class="Description_P">
					{props.News_Info[3]}
		          </p>
		          <div class="News-footer">
		            <p>
		              <span>
						{props.News_Author[3]}
		              </span>
		            </p>
		          </div>
		        </div>
		        <button class="News_Article_Link"><a  class="Link_Attch" href={news_url_3} target="_blank">Read More</a></button>
		      </article>
	      </div>
	  </body>
	</html>
  );
}

export default News_Card;
