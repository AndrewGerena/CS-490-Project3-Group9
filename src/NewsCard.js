import React from 'react';
import './News_Cards.css';

export function NewsCard({
  NewsHeadlines, NewsInfo, NewsDate, NewsUrl, NewsAuthor,
}) {
  const newsURL0 = NewsUrl[0];
  console.log(newsURL0);
  const newsURL1 = NewsUrl[1];
  console.log(newsURL1);
  const newsURL2 = NewsUrl[2];
  console.log(newsURL2);
  const newsURL3 = NewsUrl[3];
  console.log(newsURL3);
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
              alt="news"
              className="photo"
              src="https://cdn.dribbble.com/users/230290/screenshots/1059151/news.png"
            />
            <div className="description">
              <h1>{NewsHeadlines[0]}</h1>
              <p className="news_info_data">
                {NewsInfo[0]}
              </p>
              <p className="read-more">
                <h2>
                  by:&nbsp;
                  {NewsAuthor[0]}
                </h2>
                <p>{NewsDate[0]}</p>
              </p>
              <button type="button" className="NewsCard_btn">
                <a href={newsURL0} target="_blank" rel="noreferrer">Read More</a>
              </button>
            </div>
          </div>
        </div>
        <div className="blog-card alt">
          <div className="meta">
            <img
              alt="news"
              className="alt_photo"
              src="https://cdn.dribbble.com/users/230290/screenshots/1059151/news.png"
            />
            <div className="description">
              <h1>{NewsHeadlines[1]}</h1>
              <p className="news_info_data">
                {NewsInfo[1]}
              </p>
              <p className="read-more">
                <h2>
                  by:&nbsp;
                  {NewsAuthor[1]}
                </h2>
                <p>{NewsDate[1]}</p>
              </p>
              <button type="button" className="NewsCard_btn">
                <a href={newsURL1} target="_blank" rel="noreferrer">Read More</a>
              </button>
            </div>
          </div>
        </div>
        <div className="blog-card card_1">
          <div className="meta">
            <img
              alt="news"
              className="photo"
              src="https://cdn.dribbble.com/users/230290/screenshots/1059151/news.png"
            />
            <div className="description">
              <h1>{NewsHeadlines[2]}</h1>
              <p className="news_info_data">
                {NewsInfo[2]}
              </p>
              <p className="read-more">
                <h2>
                  by:&nbsp;
                  {NewsAuthor[2]}
                </h2>
                <p>{NewsDate[2]}</p>
              </p>
              <button type="button" className="NewsCard_btn">
                <a href={newsURL2} target="_blank" rel="noreferrer">Read More</a>
              </button>
            </div>
          </div>
        </div>
        <div className="blog-card alt_1">
          <div className="meta">
            <img
              alt="news"
              className="alt_photo"
              src="https://cdn.dribbble.com/users/230290/screenshots/1059151/news.png"
            />
            <div className="description">
              <h1>{NewsHeadlines[3]}</h1>
              <p className="news_info_data">
                {NewsInfo[3]}
              </p>
              <p className="read-more">
                <h2>
                  by:&nbsp;
                  {NewsAuthor[3]}
                </h2>
                <p>{NewsDate[3]}</p>
              </p>
              <button type="button" className="NewsCard_btn">
                <a href={newsURL3} target="_blank" rel="noreferrer">Read More</a>
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default NewsCard;
