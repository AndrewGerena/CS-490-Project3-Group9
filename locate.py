'''Contains the function get_location(ZIPCODE) which gets location data'''
import os
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
WEATHER_KEY = os.getenv('WEATHER_KEY')

def get_location(zipcode):
    '''Uses another OpenWeather API to get latitude and longitude'''
    zipcode = str(zipcode)

    url = "https://api.openweathermap.org/data/2.5/weather?zip={ZIPCODE}&appid={KEY}".format(
        ZIPCODE=zipcode, KEY=WEATHER_KEY)
    data = requests.get(url)
    data = data.json()
    lon = str(data["coord"]["lon"])
    lat = str(data["coord"]["lat"])
    town = str(data["name"])
    return lat, lon, town
