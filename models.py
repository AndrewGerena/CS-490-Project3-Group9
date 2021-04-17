"""Setting up database table Person"""
from app import DB


class Person(DB.Model):
    """Creating database table with the following columns: pid,
       email, full_name, given_name, family_name, image_url"""
    id = DB.Column(DB.Integer, primary_key=True)
    email = DB.Column(DB.String(80), unique=True, nullable=False)
    full_name = DB.Column(DB.String(80), unique=False, nullable=False)
    given_name = DB.Column(DB.String(80), unique=False, nullable=False)
    family_name = DB.Column(DB.String(80), unique=False, nullable=False)
    image_url = DB.Column(DB.String(160), unique=False, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.email
        