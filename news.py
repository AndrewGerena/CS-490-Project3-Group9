'''Retreives news data from API to display on News Page'''
import os
import json
import requests
from dotenv import load_dotenv, find_dotenv
from flask import Flask, send_from_directory
from flask_socketio import SocketIO

#=====================Exporting .env File=====================================
#Locating and Loading .env:                                                 #|
load_dotenv(find_dotenv())  #|
#=============================================================================

APP = Flask(__name__, static_folder='./build/static')

SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

APP.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    '''Used for building the file'''
    return send_from_directory('./build', filename)


# ///////////////////////////////NEWS Initial Data Section/////////////////////////////////////////
@SOCKETIO.on('Onload_News_Headlines')
def onload_news_data():
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
    SOCKETIO.emit('Answer_Searched_News_Topic',
                  fetched_news_data,
                  broadcast=False, include_self=True)


# /////////////////////////////////////////////////////////////////////////////////////////////////


# ///////////////////////////////COVID-19 Initial Data Section/////////////////////////////////////
@SOCKETIO.on('Onload_Covid_Global')
def onload_covid_data():
    '''Used To Send INTIAL DATA UPON PAGE LOAD'''
    covid_base_url = 'https://api.covid19api.com/summary'
    covid_response = requests.get(covid_base_url)
    covid_data = covid_response.json()

    latest_date = (covid_data["Global"]["Date"].split("T")[0])
    global_cases = covid_data["Global"]["TotalConfirmed"]
    global_new_cases = covid_data["Global"]["NewConfirmed"]
    global_deaths = covid_data["Global"]["TotalDeaths"]
    global_new_deaths = covid_data["Global"]["NewDeaths"]
    global_recovered = covid_data["Global"]["TotalRecovered"]
    global_new_recovered = covid_data["Global"]["NewRecovered"]

    print("***************COVID-19 DATA****************")
    print("Covid-19 Data From: " + str(latest_date))
    print("Global Cases: " + str(global_cases))
    print("Global New Cases: " + str(global_new_cases))
    print("Global Deaths: " + str(global_deaths))
    print("Global New Deaths: " + str(global_new_deaths))
    print("Global Recovered: " + str(global_recovered))
    print("Global New Recovered: " + str(global_new_recovered))
    fetched_country_data = {
        'Date': latest_date,
        'TotalCases': global_cases,
        'NewCases': global_new_cases,
        'TotalDeaths': global_deaths,
        'NewDeaths': global_new_deaths,
        'TotalRecovered': global_recovered,
        'NewRecovered': global_new_recovered
    }
    SOCKETIO.emit('Answer_Searched_Covid_Country',
                  fetched_country_data,
                  broadcast=False, include_self=True)


#//////////////////////////////////////////////////////////////////////////////////////////////////


# //////////////////////////////////////////////////USER ASKED NEWS DATA///////////////////////////
@SOCKETIO.on('User_Searched_News_Topic')
def fetch_user_searched_news(data):
    '''USED TO SEND USER ASKED NEWS'''
    user_searched = data['News_Topic_Searched']
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
    SOCKETIO.emit('Answer_Searched_News_Topic',
                  fetched_news_data,
                  broadcast=False, include_self=True)


#//////////////////////////////////////////////////////////////////////////////////////////////////


#//////////////////////////////////////////User Entered Country Covid Data/////////////////////////
@SOCKETIO.on('User_Searched_Covid_Country')
def fetch_user_searched_country(data):
    '''USED TO SEND COVID STATS FOR USER SEARCHED COUNTRY'''
    covid_base_url = 'https://api.covid19api.com/summary'
    covid_response = requests.get(covid_base_url)
    covid_data = covid_response.json()
    num_countries = len(covid_data["Countries"])
    user_searched = data['Covid_Country_Searched']
    for i in range(num_countries):
        country_name = covid_data["Countries"][i]["Country"]
        if str(country_name) == str(user_searched):
            country_cases = covid_data["Countries"][i]["TotalConfirmed"]
            country_new_cases = covid_data["Countries"][i]["NewConfirmed"]
            country_deaths = covid_data["Countries"][i]["TotalDeaths"]
            country_new_deaths = covid_data["Countries"][i]["NewDeaths"]
            country_recovered = covid_data["Countries"][i]["TotalRecovered"]
            country_new_recovered = covid_data["Countries"][i]["NewRecovered"]
            country_latest_date = (
                covid_data["Countries"][i]["Date"].split("T")[0])

            print("************COVID STATS FOR: " + country_name +
                  "********************")
            print(country_latest_date)
            print(country_cases)
            print(country_new_cases)
            print(country_deaths)
            print(country_new_deaths)
            print(country_recovered)
            print(country_new_recovered)

    fetched_country_data = {
        'Date': country_latest_date,
        'TotalCases': country_cases,
        'NewCases': country_new_cases,
        'TotalDeaths': country_deaths,
        'NewDeaths': country_new_deaths,
        'TotalRecovered': country_recovered,
        'NewRecovered': country_new_recovered
    }
    SOCKETIO.emit('Answer_Searched_Covid_Country',
                  fetched_country_data,
                  broadcast=False, include_self=True)


#//////////////////////////////////////////////////////////////////////////////////////////////////

if __name__ == "__main__":
    # Note that we don't call APP.run anymore. We call SOCKETIO.run with APP arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
