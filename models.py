"""Setting up database tables Person and TaskList"""
from app import DB


class Person(DB.Model):
    """Creating database table with the following columns:
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
    id = DB.Column(DB.Integer, primary_key=True, unique=True, nullable=False) ## primary key
    email = DB.Column(DB.String(80), DB.ForeignKey('person.email'), unique=False, nullable=False) ## foreign key
    date = DB.Column(DB.String(80), unique=False, nullable=False) ## convert date to string in python and store it here
    task = DB.Column(DB.String(400), unique=False, nullable=False)  
    completed = DB.Column(DB.Integer, unique=False, nullable=False) ## 0 = false, 1 = true
    
    def __repr__(self):
        return '<TaskList %r>' % self.email

    
    
