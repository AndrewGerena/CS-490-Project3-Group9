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
    

@SOCKETIO.on('User_Searched_Topic')
def Fetch_User_Searched(data):
    UserSearched = data['User_Searched']
    print("The User Searched: " + str(UserSearched))

    # SOCKETIO.emit('Answer_Searched_Topic', , broadcast=True, include_self=False)


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
