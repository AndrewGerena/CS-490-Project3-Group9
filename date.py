from datetime import datetime


def convert(time):
    temp = int(time)
    #print(datetime.utcfromtimestamp(temp).strftime('%Y-%m-%d %H:%M:%S'))
    date = datetime.utcfromtimestamp(temp).strftime('%m/%d')
    #print(date)
    #print(datetime.fromtimestamp(temp/1000).strftime("%A"))
    day = datetime.fromtimestamp(temp).strftime("%A")
    return date, day

