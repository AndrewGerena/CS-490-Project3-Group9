import unittest

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_LENGTH = "length"
KEY_FIRST_WORD = "first_word"
KEY_SECOND_WORD = "second_word"

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


if __name__ == '__main__':
    unittest.main()