import os
import requests
import json
from random import randint
from dotenv import load_dotenv, find_dotenv
from flask import Flask, send_from_directory, render_template
from flask_socketio import SocketIO


#=====================Exporting .env File=====================================
#Locating and Loading .env:                                                 #|    
load_dotenv(find_dotenv())                                                  #|
#=============================================================================

app = Flask(__name__, static_folder='./build/static')


SOCKETIO = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)
                    

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 
@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')

def index(filename):
    return send_from_directory('./build', filename)
    
    
    
# ///////////////////////////////NEWS Initial Data Section///////////////////////////////////////////////////////////////////////
@SOCKETIO.on('Onload_News_Headlines')
def Onload_News_Data():
    # BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    
    BASE_URL = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=' + str(os.getenv('NYT_KEY'))

    response = requests.get(BASE_URL)
    data = response.json()
    articles=data
    
    Storing_Headlines=[]
    Storing_Snippets=[]
    Storing_Date=[]
    Storing_URL=[]
    Storing_Author=[]
    
    print("**********************NEWS Response*************************")
    for i in range(4):
        News_Headlines = articles['results'][i]['title']
        print(News_Headlines)
        Storing_Headlines.append(News_Headlines)
        
        News_Snippets = articles['results'][i]['abstract']
        print(News_Snippets)
        Storing_Snippets.append(News_Snippets)
        
        News_Date = (articles['results'][i]['published_date'].split("T")[0])
        print(News_Date)
        Storing_Date.append(News_Date)
        
        News_URL = articles['results'][i]['url']
        print(News_URL)
        Storing_URL.append(News_URL)
        
        print(articles['results'][i]['byline'])
        Author= (articles['results'][i]['byline'].split())
        
        Author_FirstName = Author[1]
        print(Author_FirstName)
        
        Author_LastName = Author[2]
        print(Author_LastName)

        
        Storing_Author.append(str(Author_FirstName) + " " + str(Author_LastName))
        
    
    Fetched_News_Data={'Headlines': Storing_Headlines, 'Snippets': Storing_Snippets, 'Date': Storing_Date, 'URL': Storing_URL,'Author': Storing_Author}  
    SOCKETIO.emit('Answer_Searched_News_Topic', Fetched_News_Data, broadcast=True)



# ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
# ///////////////////////////////COVID-19 Initial Data Section///////////////////////////////////////////////////////////////////////
@SOCKETIO.on('Onload_Covid_Global')
def Onload_Covid_Data():
    COVID_BASE_URL = 'https://api.covid19api.com/summary'
    Covid_Response = requests.get(COVID_BASE_URL)
    Covid_Data = Covid_Response.json()
        
        
    Latest_Date = (Covid_Data["Global"]["Date"].split("T")[0])
    Global_Cases = Covid_Data["Global"]["TotalConfirmed"]
    Global_NewCases = Covid_Data["Global"]["NewConfirmed"]
    Global_Deaths = Covid_Data["Global"]["TotalDeaths"]
    Global_NewDeaths = Covid_Data["Global"]["NewDeaths"]
    Global_Recovered = Covid_Data["Global"]["TotalRecovered"]
    Global_NewRecovered = Covid_Data["Global"]["NewRecovered"]
    
    print("***************COVID-19 DATA****************")
    print("Covid-19 Data From: " +  str(Latest_Date))
    print("Global Cases: " + str(Global_Cases))
    print("Global New Cases: " + str(Global_NewCases))
    print("Global Deaths: "  + str(Global_Deaths))
    print("Global New Deaths: "  + str(Global_NewDeaths))
    print("Global Recovered: "  + str(Global_Recovered))
    print("Global New Recovered: "  + str(Global_NewRecovered))
    Fetched_Country_Data={'Date': Latest_Date , 'TotalCases': Global_Cases , 'NewCases': Global_NewCases, 'TotalDeaths': Global_Deaths , 'NewDeaths': Global_NewDeaths, 'TotalRecovered': Global_Recovered , 'NewRecovered': Global_NewRecovered }
    SOCKETIO.emit('Answer_Searched_Covid_Country', Fetched_Country_Data, broadcast=True)

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

# //////////////////////////////////////////////////USER ASKED NEWS DATA///////////////////////////////////////////////////////////////////
@SOCKETIO.on('User_Searched_News_Topic')
def Fetch_User_Searched_NEWS(data):
    UserSearched = data['News_Topic_Searched']
    print("The User Searched NEWs Topic: " + str(UserSearched))
    
    BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    #Defining the Params
    params = {
        'q': UserSearched,
        'api-key': os.getenv('NYT_KEY'),
    }
    
    response = requests.get(BASE_URL, params=params)
    data = response.json()
    articles = data['response']['docs']
    
    Storing_Headlines=[]
    Storing_Snippets=[]
    Storing_Date=[]
    Storing_URL=[]
    Storing_Author=[]
    
    print("**********************NEWS Response*************************")
    for i in range(4):
        News_Headlines = articles[i]['headline']['main']
        Storing_Headlines.append(News_Headlines)
        
        News_Snippets = articles[i]['snippet']
        Storing_Snippets.append(News_Snippets)
        
        News_Date = (articles[i]['pub_date'].split("T")[0])
        Storing_Date.append(News_Date)
        
        News_URL = articles[i]['web_url']
        Storing_URL.append(News_URL)
        
        Author_FirstName=articles[i]['byline']['person'][0]['firstname']
        Author_LastName=articles[i]['byline']['person'][0]['lastname']
        Storing_Author.append(str(Author_FirstName) + " " + str(Author_LastName))
        

    print("==============Headlines================")
    print(Storing_Headlines)
    print("==============Snippets================")
    print(Storing_Snippets)
    print("==============NEWS Date================")
    print(Storing_Date)
    print("==============NEWS URL================")
    print(Storing_URL)
    print("==============Authors================")
    print(Storing_Author)

    
    Fetched_News_Data={'Headlines': Storing_Headlines, 'Snippets': Storing_Snippets, 'Date': Storing_Date, 'URL': Storing_URL, 'Author': Storing_Author}
    SOCKETIO.emit('Answer_Searched_News_Topic', Fetched_News_Data, broadcast=True)

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



#//////////////////////////////////////////User Entered Country Covid Data////////////////////////////////////////////////////
@SOCKETIO.on('User_Searched_Covid_Country')
def Fetch_User_Searched_Country(data):
    COVID_BASE_URL = 'https://api.covid19api.com/summary'
    Covid_Response = requests.get(COVID_BASE_URL)
    Covid_Data = Covid_Response.json()
    Num_Countries = len(Covid_Data["Countries"])
    UserSearched = data['Covid_Country_Searched']
    for i in range(Num_Countries):
        Country_Name = Covid_Data["Countries"][i]["Country"]
        if(str(Country_Name) == str(UserSearched)):
            Country_Cases = Covid_Data["Countries"][i]["TotalConfirmed"]
            Country_NewCases = Covid_Data["Countries"][i]["NewConfirmed"]
            Country_Deaths = Covid_Data["Countries"][i]["TotalDeaths"]
            Country_NewDeaths = Covid_Data["Countries"][i]["NewDeaths"]
            Country_Recovered = Covid_Data["Countries"][i]["TotalRecovered"]
            Country_NewRecovered = Covid_Data["Countries"][i]["NewRecovered"]
            Country_Latest_Date = (Covid_Data["Countries"][i]["Date"].split("T")[0])
            
            print("************COVID STATS FOR: " + Country_Name + "********************")
            print(Country_Latest_Date)
            print(Country_Cases)
            print(Country_NewCases)
            print(Country_Deaths)
            print(Country_NewDeaths)
            print(Country_Recovered)
            print(Country_NewRecovered)
            
    Fetched_Country_Data={'Date': Country_Latest_Date, 'TotalCases': Country_Cases, 'NewCases': Country_NewCases, 'TotalDeaths': Country_Deaths, 'NewDeaths': Country_NewDeaths, 'TotalRecovered': Country_Recovered, 'NewRecovered': Country_NewRecovered }
    SOCKETIO.emit('Answer_Searched_Covid_Country', Fetched_Country_Data, broadcast=True)

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    


if __name__ == "__main__":
    # Note that we don't call APP.run anymore. We call SOCKETIO.run with APP arg
    SOCKETIO.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
# app.run(
#     host=os.getenv('IP', '0.0.0.0'),
#     port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
# )
