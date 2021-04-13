import requests
import os
import random
from dotenv import load_dotenv, find_dotenv



load_dotenv(find_dotenv())
WEATHER_KEY = os.getenv('WEATHER_KEY')