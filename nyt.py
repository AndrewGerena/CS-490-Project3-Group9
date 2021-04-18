import os
import json
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

def init_news_data():
    '''Used To Send INTIAL DATA UPON PAGE LOAD'''
    base_url = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=' + str(
        os.getenv('NYT_KEY'))

    response = requests.get(base_url)
    data = response.json()
    articles = data

    storing_headlines = []
    storing_snippets = []
    storing_date = []
    storing_url = []
    storing_author = []

    print("**********************NEWS Response*************************")
    for i in range(4):
        news_headlines = articles['results'][i]['title']
        print(news_headlines)
        storing_headlines.append(news_headlines)

        news_snippets = articles['results'][i]['abstract']
        print(news_snippets)
        storing_snippets.append(news_snippets)

        news_date = (articles['results'][i]['published_date'].split("T")[0])
        print(news_date)
        storing_date.append(news_date)

        news_url = articles['results'][i]['url']
        print(news_url)
        storing_url.append(news_url)

        print(articles['results'][i]['byline'])
        author = (articles['results'][i]['byline'].split())

        author_first_name = author[1]
        print(author_first_name)

        author_last_name = author[2]
        print(author_last_name)

        storing_author.append(
            str(author_first_name) + " " + str(author_last_name))

    fetched_news_data = {
        'Headlines': storing_headlines,
        'Snippets': storing_snippets,
        'Date': storing_date,
        'URL': storing_url,
        'Author': storing_author
    }
    
    return fetched_news_data


def user_searched_news(search):
    '''USED TO SEND USER ASKED NEWS'''
    user_searched = search
    print("The User Searched NEWs Topic: " + str(user_searched))

    base_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    #Defining the Params
    params = {
        'q': user_searched,
        'api-key': os.getenv('NYT_KEY'),
    }

    response = requests.get(base_url, params=params)
    data = response.json()
    articles = data['response']['docs']

    storing_headlines = []
    storing_snippets = []
    storing_date = []
    storing_url = []
    storing_author = []

    print("**********************NEWS Response*************************")
    for i in range(4):
        news_headlines = articles[i]['headline']['main']
        storing_headlines.append(news_headlines)

        news_snippets = articles[i]['snippet']
        storing_snippets.append(news_snippets)

        news_date = (articles[i]['pub_date'].split("T")[0])
        storing_date.append(news_date)

        news_url = articles[i]['web_url']
        storing_url.append(news_url)

        author_first_name = articles[i]['byline']['person'][0]['firstname']
        author_last_name = articles[i]['byline']['person'][0]['lastname']
        storing_author.append(
            str(author_first_name) + " " + str(author_last_name))

    print("==============Headlines================")
    print(storing_headlines)
    print("==============Snippets================")
    print(storing_snippets)
    print("==============NEWS Date================")
    print(storing_date)
    print("==============NEWS URL================")
    print(storing_url)
    print("==============Authors================")
    print(storing_author)

    fetched_news_data = {
        'Headlines': storing_headlines,
        'Snippets': storing_snippets,
        'Date': storing_date,
        'URL': storing_url,
        'Author': storing_author
    }

    return fetched_news_data
