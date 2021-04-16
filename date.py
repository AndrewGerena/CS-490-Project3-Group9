from datetime import datetime


def convert(time):
    temp = int(time)
    date = datetime.utcfromtimestamp(temp).strftime('%m/%d')
    day = datetime.fromtimestamp(temp).strftime("%A")
    return date, day

