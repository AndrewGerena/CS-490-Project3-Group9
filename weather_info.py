'''Contains the function pull_weather(INDEX, DATA) that gets weather data'''
from date import convert
from icon import get_icon

def pull_weather(index, data):
    '''Pulls the weather data for the specific day'''
    idx = int(index)
    dt_day_2 = str(data["daily"][idx]["dt"])
    date_day_2, dow_2 = convert(dt_day_2)
    max_day_2 = str(data["daily"][idx]["temp"]["max"])
    min_day_2 = str(data["daily"][idx]["temp"]["min"])
    weather_day_2 = str(data["daily"][idx]["weather"][0]["main"])
    icon_day_2 = str(data["daily"][idx]["weather"][0]["icon"])
    icon_day_2 = get_icon(icon_day_2)
    lst = [
        date_day_2, dow_2, max_day_2, min_day_2, weather_day_2, icon_day_2
    ]

    return lst
