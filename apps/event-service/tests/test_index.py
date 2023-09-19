from event_service.something import add
import pytest


def test_simple():
    assert add(1, 1) == 2


def test_raise_exec():
    with pytest.raises(Exception):
        add("hello", 1)
