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
                    
Current_UserSearched_Topic = ""
BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'


app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 
@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')

def index(filename):
    return send_from_directory('./build', filename)
    

@SOCKETIO.on('User_Searched_Topic')
def Fetch_User_Searched(data):
    UserSearched = data['User_Searched']
    print("The User Searched: " + str(UserSearched))
    
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
    
    print(articles)
    
    
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

    
    Fetched_Data={'Headlines': Storing_Headlines, 'Snippets': Storing_Snippets, 'Date': Storing_Date, 'URL': Storing_URL, 'Author': Storing_Author}
    SOCKETIO.emit('Answer_Searched_Topic', Fetched_Data, broadcast=True)


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
