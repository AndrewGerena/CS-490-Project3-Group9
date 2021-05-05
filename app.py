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
from nyt import user_searched_news
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
    refresh_current_tasks(data)


def get_tasks_from_date(email, date):
    """Return the dates tasks"""
    print('I am in get tasks')
    # Returns a list of all current day's tasks for the user.
    date_tasks = DB.session.query(models.TaskList).filter_by(
        date=date, email=email).all()
    return date_tasks


@SOCKETIO.on('checkForTasks')
def refresh_current_tasks(data):
    """Emit the current day's tasks to the client."""
    # print("Im here!")
    # print(data)
    # Retrieve all of the user's current tasks.
    current_tasks = get_tasks_from_date(data['email'], data['date'])
    # print("Do I reach this?")
    # Places all of the user's current tasks into a list.
    list_of_tasks = []
    for item in current_tasks:
        list_of_tasks.append({
            'email': item.email,
            'date': item.date,
            'task': item.task,
            'completed': item.completed,
            'id': item.id
        })

    # Emits the current list of user's tasks.
    SOCKETIO.emit('refreshCurrentTasks', {'currentTasks': list_of_tasks},
                  broadcast=False,
                  include_self=True)

    return list_of_tasks


@SOCKETIO.on('eraseCompletedTasks')
def erase_completed_tasks(data):  # data = {email, date}
    '''Returns a list of tasks we wish to delete.'''
    tasks_to_delete = DB.session.query(models.TaskList).filter_by(
        date=data['date'], email=data['email'], completed=1).all()

    # Delete every completed task.
    for task in tasks_to_delete:
        DB.session.delete(task)

    # Commit the deletions of the database.
    DB.session.commit()

    # Emit updated tasks to the client.
    refresh_current_tasks(data)


@SOCKETIO.on('searchDate')
def search_for_old_tasks(data):  # data = {email, date}
    '''Searches for old tasks'''
    old_tasks = get_tasks_from_date(data["email"], data["date"])
    print(old_tasks)

    list_of_tasks = []
    for item in old_tasks:
        list_of_tasks.append({
            'email': item.email,
            'date': item.date,
            'task': item.task,
            'completed': item.completed,
            'id': item.id
        })
    print(list_of_tasks)

    # Emits a list of user's old tasks.
    SOCKETIO.emit('refreshOldTasks', {'listOfOldTasks': list_of_tasks},
                  broadcast=False,
                  include_self=True)


@SOCKETIO.on('toggleComplete')
def complete_task(data):
    '''Marks a task as complete'''
    task_to_complete = DB.session.query(
        models.TaskList).filter_by(id=data['id']).first()
    print(task_to_complete)
    print(task_to_complete.completed)
    if task_to_complete.completed == 0:
        task_to_complete.completed = 1
    else:
        task_to_complete.completed = 0
    print(task_to_complete.completed)
    DB.session.commit()
    print('After the Commit')
    print(data['email'])
    print(data['date'])
    refresh_current_tasks(data)


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

@SOCKETIO.on('new_country')
def change_country(data):
    '''Will add country to DB and emit back'''
    query = DB.session.query(models.Person)
    user_info = on_filter(data["email"], query)
    user_info.country = data["country"]
    DB.session.commit()
    ## broadcast country name back to ensure we updated DB properly
    SOCKETIO.emit('new_country', {'country': data["country"]},
                  broadcast=False,
                  include_self=True)
    return user_info.country

def get_country(email):
    '''Returns user country name from DB'''
    query = DB.session.query(models.Person)
    user_info = on_filter(email, query)
    country_name = user_info.country
    return country_name

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


@SOCKETIO.on('search')
def on_search(data):
    '''Will fetch zipcode from DB and return local weather'''
    zipcode = data["zipcode"]
    if check_zip(zipcode):
        data["weather"] = get_weather(zipcode)
    else:
        data["weather"] = get_weather("10001")
    SOCKETIO.emit('forecast', data, broadcast=False, include_self=True)


@SOCKETIO.on('Onload_News_Headlines')
def onload_news_data(data):
    '''Used to Display NEWS onPage Load'''
    ## fetched_news_data = init_news_data()
    fetched_news_data = user_searched_news("Global")
    print(fetched_news_data)
    print(data)
    fetched_news_data["email"] = data["email"]
    SOCKETIO.emit('Answer_Searched_News_Topic',
                  fetched_news_data,
                  broadcast=False,
                  include_self=True)


@SOCKETIO.on('User_Searched_News_Topic')
def fetch_user_searched_news(data):
    '''USED TO SEND USER ASKED NEWS'''
    topic = data['News_Topic_Searched']
    fetched_news_data = user_searched_news(topic)
    print(fetched_news_data)
    print(data)
    fetched_news_data["email"] = data["email"]
    SOCKETIO.emit('Answer_Searched_News_Topic',
                  fetched_news_data,
                  broadcast=False,
                  include_self=True)


@SOCKETIO.on('Onload_Covid_Global')
def onload_covid_data(data):
    '''Used To Send INTIAL DATA UPON PAGE LOAD'''
    country = get_country(data["email"])
    if country is None:
        fetched_country_data = init_covid_data()
    else:
        fetched_country_data = user_searched_country(country)
    print(fetched_country_data)
    print(data)
    fetched_country_data["email"] = data["email"]
    SOCKETIO.emit('Answer_Searched_Covid_Country',
                  fetched_country_data,
                  broadcast=False,
                  include_self=True)


@SOCKETIO.on('User_Searched_Covid_Country')
def fetch_user_searched_country(data):
    '''USED TO SEND COVID STATS FOR USER SEARCHED COUNTRY'''
    country = data['Covid_Country_Searched']
    fetched_country_data = user_searched_country(country)
    print(fetched_country_data)
    print(data)
    fetched_country_data["email"] = data["email"]
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
