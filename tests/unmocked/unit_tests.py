import unittest
from datetime import datetime

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

class ZipCheckTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: "07663",
                KEY_EXPECTED: True,
            },
            {
                KEY_INPUT: "abcde",
                KEY_EXPECTED: False,
            },
            {
                KEY_INPUT: "123456",
                KEY_EXPECTED: False,
            },
        ]

        self.failure_test_params = [
            {
                KEY_INPUT: "00000",
                KEY_EXPECTED: False,
            },
            {
                KEY_INPUT: "OOOOO",
                KEY_EXPECTED: True,
            },
            {
                KEY_INPUT: "",
                KEY_EXPECTED: True,
            },
        ]

    def test_zip_success(self):
        for test in self.success_test_params:
            actual_result = check_zip(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]
            self.assertIs(actual_result, expected_result)
            self.assertEqual(actual_result, expected_result)

    def test_zip_failure(self):
        for test in self.failure_test_params:
            actual_result = check_zip(test[KEY_INPUT])

            expected_result = test[KEY_EXPECTED]

            self.assertIsNot(actual_result, expected_result)
            self.assertNotEqual(actual_result, expected_result)

def check_zip(zipcode):
    '''Checks to see if the zipcode is formatted properly'''
    if len(zipcode) == 5:
        for i in zipcode:
            if i in "0123456789":
                continue
            return False
    else:
        return False

    return True

class TimeTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: "1618693467",
                KEY_EXPECTED: ["04/17", "Saturday"],
            },
            {
                KEY_INPUT: "1735707601",
                KEY_EXPECTED: ["01/01", "Wednesday"],
            },
            {
                KEY_INPUT: "1609477201",
                KEY_EXPECTED: ["01/01", "Friday"],
            },
        ]

        self.failure_test_params = [
            {
                KEY_INPUT: "1618693467",
                KEY_EXPECTED: ["04/18", "Sunday"],
            },
            {
                KEY_INPUT: "1618693467",
                KEY_EXPECTED: ["Saturday","04/17"],
            },
            {
                KEY_INPUT: "1609563601",
                KEY_EXPECTED: ["02/01", "Sunday"],
            },

        ]

    def test_time_success(self):
        for test in self.success_test_params:
            date, day = convert(test[KEY_INPUT])
            actual_result = [date, day]
            expected_result = test[KEY_EXPECTED]

            self.assertEqual(actual_result, expected_result)
            self.assertListEqual(actual_result, expected_result)

    def test_time_failure(self):
        for test in self.failure_test_params:
            date, day = convert(test[KEY_INPUT])
            actual_result = [date, day]
            expected_result = test[KEY_EXPECTED]

            self.assertNotEqual(actual_result[0], expected_result[0])
            self.assertNotEqual(actual_result[1], expected_result[1])

def convert(time):
    '''Used to convert UNIX time to MM-DD, and Day of the Week'''
    temp = int(time)
    date = datetime.utcfromtimestamp(temp).strftime('%m/%d')
    day = datetime.fromtimestamp(temp).strftime("%A")
    return date, day

if __name__ == '__main__':
    unittest.main()