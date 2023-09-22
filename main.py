import json
from typing import Union

from fastapi import FastAPI, Request
from fastapi.responses import Response
from starlette.exceptions import HTTPException as StarletteHTTPException


app = FastAPI()

BOOKS = {
    1: {'id': 1, 'title': 'The Colour of Magic', 'author': 'Terry Pratchett'},
    2: {'id': 2, 'title': 'The Golden Compass', 'author': 'Philip Pullman'}
}

@app.get("/")
def get_book_list():
    return list(BOOKS.values())

@app.get("/book/{book_id}")
def get_book(book_id: int):
    return BOOKS.get(book_id, {})

@app.exception_handler(StarletteHTTPException)
def exception_handler(request: Request, exc: StarletteHTTPException):
    return Response(
        content=json.dumps({'status': 'exception', 'code': exc.status_code}),
        status_code=exc.status_code
    )
