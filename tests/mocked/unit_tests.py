'''
    Fill in what this test is for here
    
    1. The test for new_zip function is to make sure that a user's zipcode is being updated accurately in the DB upon user request
    2. The test for user_login function is to make sure that new users are added to the DB accordingly 
'''

import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
import models
from app import user_login, change_zip 

INPUT = {"zip": "07102", "email": "tracy@gmail.com"}
# INPUT = {"zip": "10001", "email": "sample@gmail.com"} 
EXPECTED_OUTPUT = "expected"

USER1 = models.Person(id=1,email="tracy@gmail.com",zipcode="10001",full_name="tracy mcgrady",given_name="tracy",family_name="mcgrady",image_url="https://rockets.com") 
USER2 = models.Person(id=2,email="aaron@gmail.com",zipcode="10002",full_name="aaron judge",given_name="aaron",family_name="judge",image_url="https://yankees.com") 
USER3 = models.Person(id=3,email="charles@gmail.com",zipcode="10003",full_name="charles barkley",given_name="charles",family_name="barkley",image_url="https://tnt.com") 
USER_LIST = [USER1,USER2,USER3]

class UpdateZipCodeTestCase(unittest.TestCase):
    def setUp(self):
        self.test_params = [
            {
                INPUT: {"zip": "07102", "email": "tracy@gmail.com"},
                EXPECTED_OUTPUT: "07102",
            },
            {
                INPUT: {"zip": "07103", "email": "aaron@gmail.com"},
                EXPECTED_OUTPUT: "07103",
            },
            {
                INPUT: {"zip": "07104", 'email': "charles@gmail.com"},
                EXPECTED_OUTPUT: "07104",
            },
        ]

        self.list_db_users = USER_LIST
    
    def mocked_db_session_filter(self,info):
        for person in self.list_db_users:
            if person.email == info["email"]:
                return person 
        return None
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_query(self,info):
        pass   
    
    def test_success(self):
        global INPUT
        print("Test Case 1: Update User Zipcode")
        for test in self.test_params:
            with patch('app.DB.session.query', self.mocked_query):
                with patch('app.on_filter', self.mocked_db_session_filter):
                    with patch('app.DB.session.commit', self.mocked_db_session_commit):
                        print(self.list_db_users)
                        actual_result = change_zip(INPUT) 
                        print(actual_result)
                        expected_result = test[EXPECTED_OUTPUT]
                        print(expected_result)
                        print(self.list_db_users) 
                                   
                        self.assertEqual(len(actual_result),len(expected_result))
                        self.assertEqual(actual_result, expected_result) 

if __name__ == '__main__':
    unittest.main()