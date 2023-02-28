from battlepass_api import index


def test_index():
    assert index.hello() == "Hello battlepass-api"
