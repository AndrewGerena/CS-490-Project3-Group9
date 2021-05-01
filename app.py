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
from nyt import init_news_data, user_searched_news
from covid import init_covid_data, user_searched_country

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL')  # Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Gets rid of a warning

DB = SQLAlchemy(APP)

APP.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  #//for using latest stylesheet

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
    user_exists = False
    for person in existing_users:
        if person.email == data['email']:
            user_exists = True
            break

    if not user_exists:
        add_users(data)

    SOCKETIO.emit('login', {
        'info': data,
        'user_exists': user_exists,
    },
                  broadcast=False,
                  include_self=True)  ## changing include self to true here


# Adds a current task to the user's database.
@SOCKETIO.on('addTask')
def add_task(data):
    """A new task is added to the database."""
    
    # Creates a task entry in the database.
    new_task = models.TaskList(email=data["email"],
                               date=data["date"],
                               task=data["task"],
                               completed=data["completed"])
    DB.session.add(new_task)
    DB.session.commit()
    
    # Emit updated tasks to the client.
    refreshCurrentTasks(data)


def get_tasks_from_date(email, date):
    """Return the dates tasks"""
    print('I am in get tasks')
    # Returns a list of all current day's tasks for the user.
    dateTasks = DB.session.query(models.TaskList).filter_by(date=date, email=email).all()
    return dateTasks


@SOCKETIO.on('checkForTasks')
def refreshCurrentTasks(data):
    """Emit the current day's tasks to the client."""
    print("Im here!")
    print(data)
    # Retrieve all of the user's current tasks.
    currentTasks = get_tasks_from_date(data['email'], data['date'])
    print("Do I reach this?")
    # Places all of the user's current tasks into a list.
    list_of_tasks = []
    for item in currentTasks:
        list_of_tasks.append({'email':item.email, 
                              'date':item.date,
                              'task':item.task, 
                              'completed':item.completed,
                              'id':item.id
        })
                              
    # Emits the current list of user's tasks.                          
    SOCKETIO.emit('refreshCurrentTasks', {
        'currentTasks': list_of_tasks
    },
                  broadcast=False,
                  include_self=True)
                  
                  
@SOCKETIO.on('eraseTask')
def eraseTask(data): # data = {email, date, task}
    # Returns the task we wish to delete.
    taskToDelete = DB.session.query(models.TaskList).filter_by(date=data['date'], email=data['email'], task=data['task']).first()
    
    # Delete the selected task from the database.
    DB.session.delete(taskToDelete)
    DB.session.commit()
    
    # Emit updated tasks to the client.
    refreshCurrentTasks(data)


@SOCKETIO.on('toggleComplete')
def completeTask(data):
    taskToComplete = DB.session.query(models.TaskList).filter_by(id=data['id']).first()
    print(taskToComplete)
    print(taskToComplete.completed)
    if taskToComplete.completed == 0:
        taskToComplete.completed = 1
    else:
        taskToComplete.completed = 0
    print(taskToComplete.completed)
    DB.session.commit()
    print('After the Commit')
    print(data['email'])
    print(data['date'])
    refreshCurrentTasks(data)


def add_users(data):
    '''Adding new users to the DB'''
    user_add = models.Person(email=data["email"],
                             zipcode="10001",
                             full_name=data["fullName"],
                             given_name=data["givenName"],
                             family_name=data["familyName"],
                             image_url=data["imageURL"])
    DB.session.add(user_add)
    DB.session.commit()

    all_users = models.Person.query.all()
    all_emails = []
    for person in all_users:
        all_emails.append(person.email)

    return all_emails


@SOCKETIO.on('new_zip')
def change_zip(data):
    '''Will add zipcode to DB and emit back'''
    query = DB.session.query(models.Person)
    update_user = on_filter(data["email"], query)  ## data["email"]
    update_user.zipcode = data["zip"]  # data["zip"] ## data["zip"]
    DB.session.commit()
    ## broadcast is set to false, not sure if that's what it should be here
    SOCKETIO.emit('new_zip', {'zip': data["zip"]},
                  broadcast=False,
                  include_self=True)
    # added this for mocked test
    return update_user.zipcode


def on_filter(email, query):
    '''Checks DB table and returns user with given email id'''
    return query.filter_by(email=email).first()


@SOCKETIO.on('forecast')
def on_forecast(data):
    '''Will fetch zipcode from DB and return local weather'''
    user = DB.session.query(
        models.Person).filter_by(email=data["email"]).first()
    zipcode = user.zipcode
    if check_zip(zipcode):
        data["weather"] = get_weather(zipcode)
    else:
        data["weather"] = get_weather(
            "10001"
        )  # Default for now. Will update when we can fetch the zipcode.
    SOCKETIO.emit('forecast', data, broadcast=False, include_self=True)


@SOCKETIO.on('Onload_News_Headlines')
def onload_news_data():
    '''Used to Display NEWS onPage Load'''
    fetched_news_data = init_news_data()
    SOCKETIO.emit('Answer_Searched_News_Topic',
                  fetched_news_data,
                  broadcast=False,
                  include_self=True)


@SOCKETIO.on('User_Searched_News_Topic')
def fetch_user_searched_news(data):
    '''USED TO SEND USER ASKED NEWS'''
    topic = data['News_Topic_Searched']
    fetched_news_data = user_searched_news(topic)
    SOCKETIO.emit('Answer_Searched_News_Topic',
                  fetched_news_data,
                  broadcast=False,
                  include_self=True)


@SOCKETIO.on('Onload_Covid_Global')
def onload_covid_data():
    '''Used To Send INTIAL DATA UPON PAGE LOAD'''

    fetched_country_data = init_covid_data()

    SOCKETIO.emit('Answer_Searched_Covid_Country',
                  fetched_country_data,
                  broadcast=False,
                  include_self=True)


@SOCKETIO.on('User_Searched_Covid_Country')
def fetch_user_searched_country(data):
    '''USED TO SEND COVID STATS FOR USER SEARCHED COUNTRY'''

    country = data['Covid_Country_Searched']
    fetched_country_data = user_searched_country(country)

    SOCKETIO.emit('Answer_Searched_Covid_Country',
                  fetched_country_data,
                  broadcast=False,
                  include_self=True)


# Note that we don't call app.run anymore. We call SOCKETIO.run with app arg
if __name__ == "__main__":
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
        debug=True,
    )
