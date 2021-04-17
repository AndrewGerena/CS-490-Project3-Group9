'''Used to validate the zipcode'''


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
