'''Contains the function pull_weather(INDEX, DATA) that gets weather data from json'''
from date import convert
from icon import get_icon

def pull_weather(index, data):
    '''Pulls the weather data for the specific day'''
    idx = int(index)
    dt_day = str(data["daily"][idx]["dt"])
    date_day, dow = convert(dt_day)
    max_day = str(data["daily"][idx]["temp"]["max"])
    max_day = str(round(float(max_day)))
    min_day = str(data["daily"][idx]["temp"]["min"])
    min_day = str(round(float(min_day)))
    weather_day = str(data["daily"][idx]["weather"][0]["main"])
    icon_day = str(data["daily"][idx]["weather"][0]["icon"])
    icon_day = get_icon(icon_day)
    lst = [
        date_day, dow, max_day, min_day, weather_day, icon_day
    ]

    return lst
