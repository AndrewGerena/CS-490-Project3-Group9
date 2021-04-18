"""Setting up database table Person"""
from app import DB


class Person(DB.Model):
    """Creating database table with the following columns: pid,
       email, full_name, given_name, family_name, image_url"""
    id = DB.Column(DB.Integer, primary_key=True)
    email = DB.Column(DB.String(80), unique=True, nullable=False)
    zipcode = DB.Column(DB.String(80), unique=False, nullable=False) 
    full_name = DB.Column(DB.String(80), unique=False, nullable=True)
    given_name = DB.Column(DB.String(80), unique=False, nullable=True)
    family_name = DB.Column(DB.String(80), unique=False, nullable=True)
    image_url = DB.Column(DB.String(160), unique=False, nullable=True)

    def __repr__(self):
        return '<Person %r>' % self.email
