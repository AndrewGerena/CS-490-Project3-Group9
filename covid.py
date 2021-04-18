import os
import json
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


def init_covid_data():
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
    
    return fetched_country_data


def user_searched_country(search):
    '''USED TO SEND COVID STATS FOR USER SEARCHED COUNTRY'''
    covid_base_url = 'https://api.covid19api.com/summary'
    covid_response = requests.get(covid_base_url)
    covid_data = covid_response.json()
    num_countries = len(covid_data["Countries"])
    print(num_countries)
    user_searched = search
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
    return fetched_country_data
