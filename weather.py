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

max_day_2 = data["daily"][1]["temp"]["max"]
min_day_2 = data["daily"][1]["temp"]["max"]
dt_day_2 = data["daily"][1]["dt"]
weather_day_2 = data["daily"][1]["weather"][0]["main"]

max_day_3 = data["daily"][2]["temp"]["max"]
min_day_3 = data["daily"][2]["temp"]["max"]
dt_day_3 = data["daily"][2]["dt"]
weather_day_3 = data["daily"][2]["weather"][0]["main"]

max_day_4 = data["daily"][3]["temp"]["max"]
min_day_4 = data["daily"][3]["temp"]["max"]
dt_day_4 = data["daily"][3]["dt"]
weather_day_4 = data["daily"][3]["weather"][0]["main"]

max_day_5 = data["daily"][4]["temp"]["max"]
min_day_5 = data["daily"][4]["temp"]["max"]
dt_day_5 = data["daily"][4]["dt"]
weather_day_5 = data["daily"][4]["weather"][0]["main"]


print("Current Temp: " + str(current_temp))

print("Daytime: " + str(dt_day_1) + " Max Day 1: " + str(max_day_1) + " Min Day 1: " + str(min_day_1) + " Weather: " + weather_day_1)

print("Daytime: " + str(dt_day_2) + " Max Day 2: " + str(max_day_2) + " Min Day 2: " + str(min_day_2) + " Weather: " + weather_day_2)

print("Daytime: " + str(dt_day_3) + " Max Day 3: " + str(max_day_3) + " Min Day 3: " + str(min_day_3) + " Weather: " + weather_day_3)

print("Daytime: " + str(dt_day_4) + " Max Day 4: " + str(max_day_4) + " Min Day 4: " + str(min_day_4) + " Weather: " + weather_day_4)

print("Daytime: " + str(dt_day_5) + " Max Day 5: " + str(max_day_5) + " Min Day 5: " + str(min_day_5) + " Weather: " + weather_day_5)
