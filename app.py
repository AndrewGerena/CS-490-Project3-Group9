'''ADD MODULE DOCSTRING'''
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import desc
from dotenv import load_dotenv, find_dotenv
from weather import get_weather
from zip_check import check_zip  # commented out for now

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

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
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
@SOCKETIO.on('connect')
def on_connect():
    """Function is accessed upon user connection"""
    print('User connected!')


# When a client disconnects from this Socket connection, this function is run
@SOCKETIO.on('disconnect')
def on_disconnect():
    """Function is accessed upon user disconnection"""
    print('User disconnected!')


# Login functionality
@SOCKETIO.on('login')
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
    ## new stuff

    if not user_exists:
        user_add = models.Person(email=data["email"],
                                 zipcode="10001",
                                 full_name=data["full_name"],
                                 given_name=data["given_name"],
                                 family_name=data["family_name"],
                                 image_url=data["image_url"])
        DB.session.add(user_add)
        DB.session.commit()

    SOCKETIO.emit('login', {
        'info': data,
        'user_exists': user_exists,
    },
                  broadcast=True,
                  include_self=True)  ## changing include self to true here


@SOCKETIO.on('new_zip')
def change_zip(data):
    '''Will add zipcode to DB and emit back'''
    update_user = DB.session.query(
        models.Person).filter_by(email=data["email"]).first()
    print(update_user)
    print(data["zip"])
    update_user.zipcode = data["zip"]
    DB.session.commit()
    ## broadcast is set to false, not sure if that's what it should be here
    SOCKETIO.emit('new_zip', {'zip': data["zip"]},
                  broadcast=False,
                  include_self=True)


@SOCKETIO.on('forecast')
def on_forecast(data):
    '''Will fetch zipcode from DB and return local weather'''
    user = DB.session.query(
        models.Person).filter_by(email=data["email"]).first()
    zipcode = user.zipcode
    if check_zip(zipcode):
        data = get_weather(zipcode)
    else:
        data = get_weather(
            "10001"
        )  # Default for now. Will update when we can fetch the zipcode.
    SOCKETIO.emit('forecast', data, broadcast=False, include_self=True)


# Note that we don't call app.run anymore. We call SOCKETIO.run with app arg
if __name__ == "__main__":
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
        debug=True,
    )
