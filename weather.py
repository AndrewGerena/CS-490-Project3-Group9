import requests
import os
import random
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())
WEATHER_KEY = os.getenv('WEATHER_KEY')

lat = "40.902924"
lon = "-74.094005"
URL = "https://api.openweathermap.org/data/2.5/onecall?lat={LAT}&lon={LON}&exclude=minutely,hourly,alerts&appid={KEY}&units=imperial".format(LAT=lat, LON=lon, KEY=WEATHER_KEY)

data = requests.get(URL)

data = data.json()

current_temp = data["current"]["temp"]
max_day_1 = data["daily"][0]["temp"]["max"]
min_day_1 = data["daily"][0]["temp"]["max"]
dt_day_1 = data["daily"][0]["dt"]
weather_day_1 = data["daily"][0]["weather"][0]["main"]

print("Current Temp: " + str(current_temp))
print("Daytime: " + str(dt_day_1) + " Max Day 1: " + str(max_day_1) + " Min Day 1: " + str(min_day_1) + " Weather: " + weather_day_1)
