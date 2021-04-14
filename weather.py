import requests
import os
import random
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())
WEATHER_KEY = os.getenv('WEATHER_KEY')

lat = "40.902924"
lon = "-74.094005"




def get_weather(lat, lon):
    '''Will fetch the weather data using the latitude and longitude of a location'''
    
    URL = "https://api.openweathermap.org/data/2.5/onecall?lat={LAT}&lon={LON}&exclude=minutely,hourly,alerts&appid={KEY}&units=imperial".format(LAT=lat, LON=lon, KEY=WEATHER_KEY)
    
    data = requests.get(URL)
    data = data.json()
   
    current_temp = data["current"]["temp"]
    today = [current_temp]
    
    dt_day_1 = data["daily"][0]["dt"]
    max_day_1 = data["daily"][0]["temp"]["max"]
    min_day_1 = data["daily"][0]["temp"]["max"]
    weather_day_1 = data["daily"][0]["weather"][0]["main"]
    day_1 = [dt_day_1, max_day_1, min_day_1, weather_day_1]
    
    dt_day_2 = data["daily"][1]["dt"]
    max_day_2 = data["daily"][1]["temp"]["max"]
    min_day_2 = data["daily"][1]["temp"]["max"]
    weather_day_2 = data["daily"][1]["weather"][0]["main"]
    day_2 = [dt_day_2, max_day_2, min_day_2, weather_day_2]
    
    dt_day_3 = data["daily"][2]["dt"]
    max_day_3 = data["daily"][2]["temp"]["max"]
    min_day_3 = data["daily"][2]["temp"]["max"]
    weather_day_3 = data["daily"][2]["weather"][0]["main"]
    day_3 = [dt_day_3, max_day_3, min_day_3, weather_day_3]
    
    dt_day_4 = data["daily"][3]["dt"]
    max_day_4 = data["daily"][3]["temp"]["max"]
    min_day_4 = data["daily"][3]["temp"]["max"]
    weather_day_4 = data["daily"][3]["weather"][0]["main"]
    day_4 = [dt_day_4, max_day_4, min_day_4, weather_day_4]
    
    dt_day_5 = data["daily"][4]["dt"]
    max_day_5 = data["daily"][4]["temp"]["max"]
    min_day_5 = data["daily"][4]["temp"]["max"]
    weather_day_5 = data["daily"][4]["weather"][0]["main"]
    day_5 = [dt_day_5, max_day_5, min_day_5, weather_day_5]
    
    lst = [today, day_1, day_2, day_3, day_4, day_5]
    
    return lst


weather_data = get_weather(lat,lon)
print("Current Temp: " + str(weather_data[0][0]))
    
print("Daytime: " + str(weather_data[1][0]) + " Max Day 1: " + str(weather_data[1][1]) + " Min Day 1: " + str(weather_data[1][2]) + " Weather: " + weather_data[1][3])
    
print("Daytime: " + str(weather_data[2][0]) + " Max Day 2: " + str(weather_data[2][1]) + " Min Day 2: " + str(weather_data[2][2]) + " Weather: " + weather_data[2][3])
    
print("Daytime: " + str(weather_data[3][0]) + " Max Day 3: " + str(weather_data[3][1]) + " Min Day 3: " + str(weather_data[3][2]) + " Weather: " + weather_data[3][3])
    
print("Daytime: " + str(weather_data[4][0]) + " Max Day 4: " + str(weather_data[4][1]) + " Min Day 3: " + str(weather_data[4][2]) + " Weather: " + weather_data[4][3])
    
print("Daytime: " + str(weather_data[5][0]) + " Max Day 5: " + str(weather_data[5][1]) + " Min Day 3: " + str(weather_data[5][2]) + " Weather: " + weather_data[5][3])