"""
    Module for creating queries for and call the Google Books API
"""

import json
import logging
import os
from typing import Union

import requests


GOOGLE_API_URL = 'https://www.googleapis.com/books/v1'
GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY', 'AIzaSyDtE5K6t3QY8YL_ekoi4X9ePTqDnQQE324')

class GoogleAPIException(Exception):
    """
        Custom Exception for Google API pre-request checks
        Not entirely necessary for challenge, relevant in production scenarios
    """
    pass

def _construct_query(*subpaths: str, **kwargs: str) -> str:
    """
        Convert all subpaths and keyword arguments
        into a url query string and append an API key
    """
    path = '/'.join(subpaths)

    query = {'key': GOOGLE_API_KEY}
    query.update(kwargs)
    query_str = '&'.join(f'{k}={v}' for (k, v) in query.items())

    return f'{path}?{query_str}'

def _send_request(query: str) -> requests.Response:
    """
        Simple function for sending get request to Google Books API
    """
    request_url = f'{GOOGLE_API_URL}/{query}'
    logging.debug(f'Sending request to: {request_url}')
    return requests.get(request_url)

def _validate_request_path(*subpaths, **kwargs):
    """
        Check for invalid elements in outgoing requests
        Not entirely necessary for challenge, relevant in production scenarios
    """
    if None in subpaths or None in kwargs.values():
        raise GoogleAPIException("""
            Missing query value:
            Path: {json.dumps(subpaths)}
            Query: {json.dumps(kwargs)}
        """)

def query_books_api(endpoint: str, *subpaths: str, **kwargs: str) -> requests.Response:
    """
        Send request to Google Books API given:

        Parameters:
        -----------
        endpoint: str
            API endpoint, e.g. 'volumes'
        subpaths: positional subpath str arguments
            Any additional subpaths on query e.g. /volumes/{book_id}
        kwargs: str keyword arguments
            Any query strings to be used in the query e.g. /volumes?q=Hitchhikers
    """
    _validate_request_path(endpoint, *subpaths, **kwargs)
    query = _construct_query(endpoint, *subpaths, **kwargs)
    return _send_request(query)


