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
    
    print("**********************NEWS Response*************************")
    print(data)
    
    
    Fetched_NewsHeadlines=['Topic-#1','Topic-#2','Topic-#3','Topic-#4']
    Fetched_NewsSnippets=['Snippet-#1','Snippet-#2','Snippet-#3','Snippet-#4']
    
    Fetched_Data={'Headlines':Fetched_NewsHeadlines, 'Snippets': Fetched_NewsSnippets}
    SOCKETIO.emit('Answer_Searched_Topic', Fetched_Data, broadcast=True)



print("The NYT KEY IS: " + os.getenv('NYT_KEY'))


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
