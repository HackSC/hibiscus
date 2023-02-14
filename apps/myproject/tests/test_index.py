from myproject import index


def test_index():
    assert index.hello() == "Hello myproject"
