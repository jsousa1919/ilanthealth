import json
import requests
from typing import Union

from fastapi import FastAPI, Request
from fastapi.responses import Response
from starlette.exceptions import HTTPException as StarletteHTTPException

from books_api import query_books_api


app = FastAPI()

@app.get("/")
def get_book_list(query: str = ''):
    if not query:
        raise StarletteHTTPException(
            status_code=400,
            detail='Missing query'
        )
    res = query_books_api('volumes', q=query)
    return res.json()

@app.get("/book/{book_id}")
def get_book(book_id: str):
    res = query_books_api('volumes', book_id)
    return res.json()
