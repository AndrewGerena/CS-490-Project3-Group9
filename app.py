'''ADD MODULE DOCSTRING'''
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import desc
from dotenv import load_dotenv, find_dotenv
#from weather import get_weather



load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL')  # Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Gets rid of a warning

DB = SQLAlchemy(APP)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models

DB.create_all()

cors = CORS(APP, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

###########


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """Setup method"""
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    """Function is accessed upon user connection"""
    print('User connected!')


# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    """Function is accessed upon user disconnection"""
    print('User disconnected!')


# Login functionality
@socketio.on('login')
def user_login(data):
    """User list is updated upon login events"""
    print(str(data))
    existing_users = models.Person.query.all()
    #email_list = []
    user_exists = False
    for person in existing_users:
        # email_list.append(person.email)
        if person.email == data['email']:
            user_exists = True
            break

    socketio.emit('login', {
        'info': data,
        'user_exists': user_exists,
    },
                  broadcast=True,
                  include_self=True)  ## changing include self to true


# Note that we don't call app.run anymore. We call socketio.run with app arg
if __name__ == "__main__":
    socketio.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
        debug=True,
    )
