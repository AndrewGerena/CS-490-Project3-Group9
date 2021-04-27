"""Setting up database table Person"""
from app import DB


class Person(DB.Model):
    """Creating database table with the following columns: pid,
       email, full_name, given_name, family_name, image_url"""
    __tablename__ = 'person'
    ## id = DB.Column(DB.Integer, primary_key=True)
    email = DB.Column(DB.String(80), primary_key=True) ## primary key
    zipcode = DB.Column(DB.String(80), unique=False, nullable=False)
    full_name = DB.Column(DB.String(80), unique=False, nullable=True)
    given_name = DB.Column(DB.String(80), unique=False, nullable=True)
    family_name = DB.Column(DB.String(80), unique=False, nullable=True)
    image_url = DB.Column(DB.String(160), unique=False, nullable=True)

    def __repr__(self):
        return '<Person %r>' % self.email
    
class TaskList(DB.Model):
    """Creating DB table to store task lists from the past"""
    __tablename__ = 'tasklist' 
    ## id = DB.Column(DB.Integer, primary_key=True, unique=True, nullable=False) ## primary key
    email = DB.Column(DB.String(80), DB.ForeignKey('person.email'), primary_key=True, unique=False, nullable=False) ## foreign key
    date = DB.Column(DB.String(80), primary_key=True, unique=False, nullable=False) ## convert date to string in python and store it here
    task1 = DB.Column(DB.String(400), unique=False, nullable=True) 
    task2 = DB.Column(DB.String(400), unique=False, nullable=True)
    task3 = DB.Column(DB.String(400), unique=False, nullable=True)
    task4 = DB.Column(DB.String(400), unique=False, nullable=True)
    task5 = DB.Column(DB.String(400), unique=False, nullable=True)
    task6 = DB.Column(DB.String(400), unique=False, nullable=True)
    task7 = DB.Column(DB.String(400), unique=False, nullable=True)
    task8 = DB.Column(DB.String(400), unique=False, nullable=True)
    task9 = DB.Column(DB.String(400), unique=False, nullable=True)
    task10 = DB.Column(DB.String(400), unique=False, nullable=True)
    
    def __repr__(self):
        return '<TaskList %r>' % self.email

    
    
