def add(a, b):
    if type(a) != int or type(b) != int:
        raise Exception("a,b must be integers")
    return a + b
