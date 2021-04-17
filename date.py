"""ADD MODULE DOCSTRING"""
from datetime import datetime

def convert(time):
    """ADD FUNCTION DOCSTRING"""
    temp = int(time)
    date = datetime.utcfromtimestamp(temp).strftime('%m/%d')
    day = datetime.fromtimestamp(temp).strftime("%A")
    return date, day
