'''Contains the function and get_weather(ZIPCODE) which gets forecast data.'''
import os
import requests
from dotenv import load_dotenv, find_dotenv
from icon import get_icon
from weather_info import pull_weather
from locate import get_location

load_dotenv(find_dotenv())
WEATHER_KEY = os.getenv('WEATHER_KEY')

def get_weather(zipcode):
    '''Will fetch the weather data using the latitude and longitude of a location'''

    lat, lon, town = get_location(zipcode)
    url = "https://api.openweathermap.org/data/2.5/onecall?lat={LAT}&lon={LON}&e"\
          "xclude=minutely,hourly,alerts&appid={KEY}&units=imperial".format(\
          LAT=lat, LON=lon, KEY=WEATHER_KEY)

    data = requests.get(url)
    data = data.json()

    current_temp = str(data["current"]["temp"])
    current_temp = str(round(float(current_temp)))
    current_weather = str(data["current"]["weather"][0]["main"])
    icon_curr = str(data["current"]["weather"][0]["icon"])
    icon_curr = get_icon(icon_curr)
    today = [town, current_temp, current_weather, icon_curr]

    day_1 = pull_weather(0, data)

    day_2 = pull_weather(1, data)

    day_3 = pull_weather(2, data)

    day_4 = pull_weather(3, data)

    day_5 = pull_weather(4, data)

    lst = [today, day_1, day_2, day_3, day_4, day_5]

    return lst
