'''Contains the function get_location(ZIPCODE) and get_weather(ZIPCODE).'''
import os
import requests
from dotenv import load_dotenv, find_dotenv
from date import convert
from icon import get_icon

load_dotenv(find_dotenv())
WEATHER_KEY = os.getenv('WEATHER_KEY')


def get_location(zipcode):
    '''Uses another OpenWeather API to get latitude and longitude'''
    url = "https://api.openweathermap.org/data/2.5/weather?zip={ZIPCODE}&appid={KEY}".format(
        ZIPCODE=zipcode, KEY=WEATHER_KEY)
    data = requests.get(url)
    data = data.json()
    lon = str(data["coord"]["lon"])
    lat = str(data["coord"]["lat"])
    town = str(data["name"])
    return lat, lon, town


def get_weather(zipcode):
    '''Will fetch the weather data using the latitude and longitude of a location'''

    lat, lon, town = get_location(zipcode)
    url = "https://api.openweathermap.org/data/2.5/onecall?lat={LAT}&lon={LON}&e"\
          "xclude=minutely,hourly,alerts&appid={KEY}&units=imperial".format(\
          LAT=lat, LON=lon, KEY=WEATHER_KEY)

    data = requests.get(url)
    data = data.json()

    current_temp = str(data["current"]["temp"])
    current_weather = str(data["current"]["weather"][0]["main"])
    icon_curr = str(data["current"]["weather"][0]["icon"])
    icon_curr = get_icon(icon_curr)
    today = [town, current_temp, current_weather, icon_curr]

    dt_day_1 = str(data["daily"][0]["dt"])
    date_day_1, dow_1 = convert(dt_day_1)
    max_day_1 = str(data["daily"][0]["temp"]["max"])
    min_day_1 = str(data["daily"][0]["temp"]["min"])
    weather_day_1 = str(data["daily"][0]["weather"][0]["main"])
    icon_day_1 = str(data["daily"][0]["weather"][0]["icon"])
    icon_day_1 = get_icon(icon_day_1)
    day_1 = [
        date_day_1, dow_1, max_day_1, min_day_1, weather_day_1, icon_day_1
    ]

    dt_day_2 = str(data["daily"][1]["dt"])
    date_day_2, dow_2 = convert(dt_day_2)
    max_day_2 = str(data["daily"][1]["temp"]["max"])
    min_day_2 = str(data["daily"][1]["temp"]["min"])
    weather_day_2 = str(data["daily"][1]["weather"][0]["main"])
    icon_day_2 = str(data["daily"][1]["weather"][0]["icon"])
    icon_day_2 = get_icon(icon_day_2)
    day_2 = [
        date_day_2, dow_2, max_day_2, min_day_2, weather_day_2, icon_day_2
    ]

    dt_day_3 = str(data["daily"][2]["dt"])
    date_day_3, dow_3 = convert(dt_day_3)
    max_day_3 = str(data["daily"][2]["temp"]["max"])
    min_day_3 = str(data["daily"][2]["temp"]["min"])
    weather_day_3 = str(data["daily"][2]["weather"][0]["main"])
    icon_day_3 = str(data["daily"][2]["weather"][0]["icon"])
    icon_day_3 = get_icon(icon_day_3)
    day_3 = [
        date_day_3, dow_3, max_day_3, min_day_3, weather_day_3, icon_day_3
    ]

    dt_day_4 = str(data["daily"][3]["dt"])
    date_day_4, dow_4 = convert(dt_day_4)
    max_day_4 = str(data["daily"][3]["temp"]["max"])
    min_day_4 = str(data["daily"][3]["temp"]["min"])
    weather_day_4 = str(data["daily"][3]["weather"][0]["main"])
    icon_day_4 = str(data["daily"][3]["weather"][0]["icon"])
    icon_day_4 = get_icon(icon_day_4)
    day_4 = [
        date_day_4, dow_4, max_day_4, min_day_4, weather_day_4, icon_day_4
    ]

    dt_day_5 = str(data["daily"][4]["dt"])
    date_day_5, dow_5 = convert(dt_day_5)
    max_day_5 = str(data["daily"][4]["temp"]["max"])
    min_day_5 = str(data["daily"][4]["temp"]["min"])
    weather_day_5 = str(data["daily"][4]["weather"][0]["main"])
    icon_day_5 = str(data["daily"][4]["weather"][0]["icon"])
    icon_day_5 = get_icon(icon_day_5)
    day_5 = [
        date_day_5, dow_5, max_day_5, min_day_5, weather_day_5, icon_day_5
    ]

    lst = [today, day_1, day_2, day_3, day_4, day_5]

    return lst
