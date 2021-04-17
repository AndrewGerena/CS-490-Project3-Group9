'''Contains the function convert(UNIX_TIME). Used for weather.py'''
from datetime import datetime


def convert(time):
    '''Used to convert UNIX time to MM-DD, and Day of the Week'''
    temp = int(time)
    date = datetime.utcfromtimestamp(temp).strftime('%m/%d')
    day = datetime.fromtimestamp(temp).strftime("%A")
    return date, day
