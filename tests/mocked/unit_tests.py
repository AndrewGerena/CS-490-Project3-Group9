'''
    Fill in what this test is for here
    
    1. The test for change_zip function is to make sure that a user's zipcode is being updated accurately in the DB upon user request
    2. The test for add_users function is to make sure that new users are added to the DB correctly 
    3. The test for change_country function is to ensure that user's country is updated correctly in DB
    4. The test for refresh_current_tasks function is to ensure that only current day's tasks for a given user email id are fetched
'''

import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
# sys.path.append(os.path.abspath(''))
import models
from app import add_users, change_zip, change_country, refresh_current_tasks

INPUT_USER = "input"
EXPECTED_OUTPUT = "output"

USER1 = models.Person(email="tracy@gmail.com",zipcode="10001",full_name="tracy mcgrady",given_name="tracy",family_name="mcgrady",image_url="https://rockets.com",country="brazil") 
USER2 = models.Person(email="aaron@gmail.com",zipcode="10002",full_name="aaron judge",given_name="aaron",family_name="judge",image_url="https://yankees.com",country="france") 
USER3 = models.Person(email="charles@gmail.com",zipcode="10003",full_name="charles barkley",given_name="charles",family_name="barkley",image_url="https://tnt.com",country="italy") 
USER_LIST = [USER1,USER2,USER3]

TASK1 = models.TaskList(id=1,email="tracy@gmail.com",date="522021",task="walk my dog",completed=0)
TASK2 = models.TaskList(id=2,email="tracy@gmail.com",date="532021",task="feed my fish",completed=1)
TASK3 = models.TaskList(id=3,email="tracy@gmail.com",date="532021",task="run a mile",completed=1)
TASK4 = models.TaskList(id=4,email="aaron@gmail.com",date="542021",task="throw a ball",completed=1)
TASK5 = models.TaskList(id=5,email="aaron@gmail.com",date="542021",task="eat a banana",completed=1)
TASK6 = models.TaskList(id=6,email="aaron@gmail.com",date="542021",task="play ball",completed=0)
TASK_LIST = [TASK1,TASK2,TASK3,TASK4,TASK5,TASK6]

class UpdateZipCodeTestCase(unittest.TestCase):
    def setUp(self):
        self.test_params = [
            {
                INPUT_USER: {"zip": "07102", "email": "tracy@gmail.com"},
                EXPECTED_OUTPUT: "07102",
            },
            {
                INPUT_USER: {"zip": "07103", "email": "tracy@gmail.com"},
                EXPECTED_OUTPUT: "07103",
            },
            {
                INPUT_USER: {"zip": "07104", "email": "tracy@gmail.com"},
                EXPECTED_OUTPUT: "07104",
            },
        ]

        self.list_db_users = USER_LIST
    
    def mocked_db_session_filter(self,info,query):
        # print(info) 
        for person in self.list_db_users:
            if person.email == info: ## info["email"] 
                return person 
        return None
    
    def mocked_db_session_query(self,info):
        pass   
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_socket_io_emit(self,event,data,broadcast,include_self):
        pass
    
    def test_success(self):
        print("Test Case 1: Update User Zipcode")
        for test in self.test_params:
            print(test) 
            with patch('app.DB.session.query', self.mocked_db_session_query):
                with patch('app.on_filter', self.mocked_db_session_filter):
                    with patch('app.DB.session.commit', self.mocked_db_session_commit):
                        with patch('app.SOCKETIO.emit', self.mocked_socket_io_emit):
                            # print(self.list_db_users)
                            actual_result = change_zip(test[INPUT_USER])  ## 
                            print(actual_result)
                            expected_result = test[EXPECTED_OUTPUT]
                            print(expected_result)
                            # print(self.list_db_users) 
                                       
                            self.assertEqual(len(actual_result),len(expected_result))
                            self.assertEqual(actual_result, expected_result) 

class UpdateUsersTestCase(unittest.TestCase):
    def setUp(self):
        self.test_params = [
            {
                INPUT_USER: {"email": "dwyane@gmail.com","fullName": "dwyane wade","givenName": "dwyane","familyName": "wade","imageURL": "https://heat.com"},
                EXPECTED_OUTPUT: ["tracy@gmail.com","aaron@gmail.com","charles@gmail.com","dwyane@gmail.com"],
            },
            {
                INPUT_USER: {"email": "thomas@gmail.com","fullName": "thomas brady","givenName": "thomas","familyName": "brady","imageURL": "https://tb12.com"},
                EXPECTED_OUTPUT: ["tracy@gmail.com","aaron@gmail.com","charles@gmail.com","dwyane@gmail.com","thomas@gmail.com"],
            },
            {
                INPUT_USER: {"email": "derek@gmail.com","fullName": "derek jeter","givenName": "derek","familyName": "jeter","imageURL": "https://marlins.com"},
                EXPECTED_OUTPUT: ["tracy@gmail.com","aaron@gmail.com","charles@gmail.com","dwyane@gmail.com","thomas@gmail.com","derek@gmail.com"],
            },
        ]

        self.list_db_users = USER_LIST
    
    def mocked_db_session_add(self,info):
        USER_LIST.append(info)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_person_query_all(self):
        return self.list_db_users
    
    def test_success(self):
        print("Test Case 2: Update User List upon new logins")
        for test in self.test_params:
            # print(test) 
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_person_query:
                        mocked_person_query.all = self.mocked_person_query_all
                        print(self.list_db_users)
                        actual_result = add_users(test[INPUT_USER])  ## 
                        print(actual_result)
                        expected_result = test[EXPECTED_OUTPUT]
                        print(expected_result)
                        print(self.list_db_users) 
                                       
                        self.assertEqual(len(actual_result),len(expected_result))
                        self.assertEqual(actual_result, expected_result) 
                        print(" ") 

class UpdateCountryTestCase(unittest.TestCase):
    def setUp(self):
        self.test_params = [
            {
                INPUT_USER: {"country": "algeria", "email": "tracy@gmail.com"},
                EXPECTED_OUTPUT: "algeria",
            },
            {
                INPUT_USER: {"country": "canada", "email": "tracy@gmail.com"},
                EXPECTED_OUTPUT: "canada",
            },
            {
                INPUT_USER: {"country": "austria", "email": "tracy@gmail.com"},
                EXPECTED_OUTPUT: "austria",
            },
        ]

        self.list_db_users = USER_LIST
    
    def mocked_db_session_filter(self,info,query):
        for person in self.list_db_users:
            if person.email == info:
                return person 
        return None
    
    def mocked_db_session_query(self,info):
        pass   
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_socket_io_emit(self,event,data,broadcast,include_self):
        pass
    
    def test_success(self):
        print("Test Case 3: Update User Home Country")
        for test in self.test_params:
            print(test) 
            with patch('app.DB.session.query', self.mocked_db_session_query):
                with patch('app.on_filter', self.mocked_db_session_filter):
                    with patch('app.DB.session.commit', self.mocked_db_session_commit):
                        with patch('app.SOCKETIO.emit', self.mocked_socket_io_emit):
                            # print(self.list_db_users)
                            actual_result = change_country(test[INPUT_USER])  ## 
                            print(actual_result)
                            expected_result = test[EXPECTED_OUTPUT]
                            print(expected_result)
                            # print(self.list_db_users) 
                                       
                            self.assertEqual(len(actual_result),len(expected_result))
                            self.assertEqual(actual_result, expected_result) 

class GetCurrentTaskListTestCase(unittest.TestCase):
    def setUp(self):
        self.test_params = [
            {
                INPUT_USER: {"email": "tracy@gmail.com", "date": "522021"},
                EXPECTED_OUTPUT: [{'email': "tracy@gmail.com",'date':"522021",'task':"walk my dog",'completed':0,'id':1}],
            },
            {
                INPUT_USER: {"email": "tracy@gmail.com", "date": "532021"},
                EXPECTED_OUTPUT: [{'email': "tracy@gmail.com",'date':"532021",'task':"feed my fish",'completed':1,'id':2},{'email': "tracy@gmail.com",'date':"532021",'task':"run a mile",'completed':1,'id':3}],
            },
            {
                INPUT_USER: {"email": "aaron@gmail.com", "date": "542021"},
                EXPECTED_OUTPUT: [{'email': "aaron@gmail.com",'date':"542021",'task':"throw a ball",'completed':1,'id':4},{'email': "aaron@gmail.com",'date':"542021",'task':"eat a banana",'completed':1,'id':5},{'email': "aaron@gmail.com",'date':"542021",'task':"play ball",'completed':0,'id':6}],
            },
            {
                INPUT_USER: {"email": "tracy@gmail.com", "date": "542021"},
                EXPECTED_OUTPUT: [],
            },
            {
                INPUT_USER: {"email": "aaron@gmail.com", "date": "552021"},
                EXPECTED_OUTPUT: [],
            }
        ]

        self.list_db_users = USER_LIST
        self.list_db_tasks = TASK_LIST
    
    def mocked_db_get_tasks_from_date(self,email,date):
        list_current_tasks = []
        for task in self.list_db_tasks:
            if task.email == email and task.date == date:
                list_current_tasks.append(task)
        return list_current_tasks
    
    def mocked_socket_io_emit(self,event,data,broadcast,include_self):
        pass
    
    def test_success(self):
        print("Test Case 4: Get Current Day's TaskList")
        for test in self.test_params:
            print(test) 
            with patch('app.get_tasks_from_date', self.mocked_db_get_tasks_from_date):
                with patch('app.SOCKETIO.emit', self.mocked_socket_io_emit):
                    # print(self.list_db_users)
                    actual_result = refresh_current_tasks(test[INPUT_USER])  ## 
                    print(actual_result)
                    expected_result = test[EXPECTED_OUTPUT]
                    print(expected_result)
                    # print(self.list_db_users) 
                                       
                    self.assertEqual(len(actual_result),len(expected_result))
                    self.assertEqual(actual_result, expected_result) 

if __name__ == '__main__':
    unittest.main()