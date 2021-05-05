import React from 'react';
import './News_Cards.css';

export function NewsCard(props) {
  const news_url_0 = props.News_Url[0];
  console.log(news_url_0);
  const news_url_1 = props.News_Url[1];
  console.log(news_url_1);
  const news_url_2 = props.News_Url[2];
  console.log(news_url_2);
  const news_url_3 = props.News_Url[3];
  console.log(news_url_3);
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="./News_Cards.css" />
      </head>
      <body>
        <div className="blog-card">
          <div className="meta">
            <img
              className="photo"
              src="https://cdn.dribbble.com/users/230290/screenshots/1059151/news.png"
            />
            <div className="description">
              <h1>{props.News_Headlines[0]}</h1>
              <p className="news_info_data">
                {props.News_Info[0]}
              </p>
              <p className="read-more">
                <h2>
                  by:&nbsp;
                  {props.News_Author[0]}
                </h2>
                <p>{props.News_Date[0]}</p>
              </p>
              <button className="NewsCard_btn">
                <a href={news_url_0} target="_blank" rel="noreferrer">Read More</a>
              </button>
            </div>
          </div>
        </div>
        <div className="blog-card alt">
          <div className="meta">
            <img
              className="alt_photo"
              src="https://cdn.dribbble.com/users/230290/screenshots/1059151/news.png"
            />
            <div className="description">
              <h1>{props.News_Headlines[1]}</h1>
              <p className="news_info_data">
                {props.News_Info[1]}
              </p>
              <p className="read-more">
                <h2>
                  by:&nbsp;
                  {props.News_Author[1]}
                </h2>
                <p>{props.News_Date[1]}</p>
              </p>
              <button className="NewsCard_btn">
                <a href={news_url_1} target="_blank" rel="noreferrer">Read More</a>
              </button>
            </div>
          </div>
        </div>
        <div className="blog-card card_1">
          <div className="meta">
            <img
              className="photo"
              src="https://cdn.dribbble.com/users/230290/screenshots/1059151/news.png"
            />
            <div className="description">
              <h1>{props.News_Headlines[2]}</h1>
              <p className="news_info_data">
                {props.News_Info[2]}
              </p>
              <p className="read-more">
                <h2>
                  by:&nbsp;
                  {props.News_Author[2]}
                </h2>
                <p>{props.News_Date[2]}</p>
              </p>
              <button className="NewsCard_btn">
                <a href={news_url_2} target="_blank" rel="noreferrer">Read More</a>
              </button>
            </div>
          </div>
        </div>
        <div className="blog-card alt_1">
          <div className="meta">
            <img
              className="alt_photo"
              src="https://cdn.dribbble.com/users/230290/screenshots/1059151/news.png"
            />
            <div className="description">
              <h1>{props.News_Headlines[3]}</h1>
              <p className="news_info_data">
                {props.News_Info[3]}
              </p>
              <p className="read-more">
                <h2>
                  by:&nbsp;
                  {props.News_Author[3]}
                </h2>
                <p>{props.News_Date[3]}</p>
              </p>
              <button className="NewsCard_btn">
                <a href={news_url_3} target="_blank" rel="noreferrer">Read More</a>
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default NewsCard;
