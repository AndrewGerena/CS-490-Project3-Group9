'''Contains the function get_icon(ICON_ID). Used with weather.py'''
def get_icon(icon):
    '''Fetchs the icon based on the icon code in the API'''
    url = "http://openweathermap.org/img/wn/{ICON}@2x.png".format(ICON=icon)
    return url
