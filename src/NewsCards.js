import React from 'react';
import './News_Cards.css';
import PropTypes from 'prop-types';

export function NewsCard({
  NewsUrl, NewsDate, NewsHeadlines, NewsInfo, NewsAuthor,
}) {
  console.log('Log for Andrew to read');
  console.log(NewsUrl);
  console.log(NewsDate);
  console.log(NewsHeadlines);
  console.log(NewsInfo);
  console.log(NewsAuthor);
  console.log(NewsDate);
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
        <link rel="stylesheet" href="./News.css" />
      </head>
      <body>
        <div className="section-center">
          <article className="News-card">
            <div className="News-img-container">
              <img
                src="https://image.freepik.com/free-vector/breaking-news-background-with-world-map-backdrop-global-connectivity-line-headline-bar-modern-futuristic-news-template_35632-197.jpg"
                alt="News img"
                className="News-img"
              />
              <p className="News-date">{NewsDate[0]}</p>
            </div>
            <div className="News-info">
              <h4 className="Title">{NewsHeadlines[0]}</h4>
              <p className="Description_P">{NewsInfo[0]}</p>
              <div className="News-footer">
                <p>
                  <span>{NewsAuthor[0]}</span>
                </p>
              </div>
            </div>
            <button type="button" className="News_Article_Link">
              <a className="Link_Attch" href={newsURL0} target="_blank" rel="noreferrer">
                Read More
              </a>
            </button>
          </article>
          <article className="News-card">
            <div className="News-img-container">
              <img
                src="https://image.freepik.com/free-vector/breaking-news-background-with-world-map-backdrop-global-connectivity-line-headline-bar-modern-futuristic-news-template_35632-197.jpg"
                alt="News Img"
                className="News-img"
              />
              <p className="News-date">{NewsDate[1]}</p>
            </div>
            <div className="News-info">
              <h4>{NewsHeadlines[1]}</h4>
              <p className="Description_P">{NewsInfo[1]}</p>
              <div className="News-footer">
                <p>
                  <span>{NewsAuthor[1]}</span>
                </p>
              </div>
            </div>
            <button type="button" className="News_Article_Link">
              <a className="Link_Attch" href={newsURL1} target="_blank" rel="noreferrer">
                Read More
              </a>
            </button>
          </article>
          <article className="News-card">
            <div className="News-img-container">
              <img
                src="https://image.freepik.com/free-vector/breaking-news-background-with-world-map-backdrop-global-connectivity-line-headline-bar-modern-futuristic-news-template_35632-197.jpg"
                alt="News Img"
                className="News-img"
              />
              <p className="News-date">{NewsDate[2]}</p>
            </div>
            <div className="News-info">
              <h4>{NewsHeadlines[2]}</h4>
              <p className="Description_P">{NewsInfo[2]}</p>
              <div className="News-footer">
                <p>
                  <span>{NewsAuthor[2]}</span>
                </p>
              </div>
            </div>
            <button type="button" className="News_Article_Link">
              <a className="Link_Attch" href={newsURL2} target="_blank" rel="noreferrer">
                Read More
              </a>
            </button>
          </article>
          <article className="News-card">
            <div className="News-img-container">
              <img
                src="https://image.freepik.com/free-vector/breaking-news-background-with-world-map-backdrop-global-connectivity-line-headline-bar-modern-futuristic-news-template_35632-197.jpg"
                alt="News Img"
                className="News-img"
              />
              <p className="News-date">{NewsDate[3]}</p>
            </div>
            <div className="News-info">
              <h4>{NewsHeadlines[3]}</h4>
              <p className="Description_P">{NewsInfo[3]}</p>
              <div className="News-footer">
                <p>
                  <span>{NewsAuthor[3]}</span>
                </p>
              </div>
            </div>
            <button type="button" className="News_Article_Link">
              <a className="Link_Attch" href={newsURL3} target="_blank" rel="noreferrer">
                Read More
              </a>
            </button>
          </article>
        </div>
      </body>
    </html>
  );
}

NewsCard.propTypes = {
  NewsUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
  NewsHeadlines: PropTypes.arrayOf(PropTypes.string).isRequired,
  NewsInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
  NewsAuthor: PropTypes.arrayOf(PropTypes.string).isRequired,
  NewsDate: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewsCard;
