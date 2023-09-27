import axios from 'axios';
import React from 'react';

export const SET_QUERY = 'SET_QUERY';
export const START_REQUEST = 'START_REQUEST';
export const BOOKS_RECEIVED = 'BOOKS_RECEIVED';
export const BOOKS_FAILED = 'BOOKS_FAILED';


const API_URL: string = 'https://ilanthealth-api.netscaping.com/';

export function getBooksThunk() {
  return (dispatch, getState) => {
    const {
      query,
    } = getState();

    dispatch(requestStarted());

    axios.get(API_URL, { params: { query } }).then(
      response => dispatch(booksReceived(response.data)),
      error => dispatch(booksFailed(error.detail))
    );
  };
};

const setQuery = (query) => ({
  type: SET_QUERY,
  query,
});

const requestStarted = () => ({
  type: START_REQUEST,
});

const booksReceived = (books) => ({
  type: BOOKS_RECEIVED,
  books: books.items,
});

const booksFailed = (error) => ({
  type: BOOKS_FAILED,
  error,
});

let requestTimeout;
export function updateQueryThunk(query) {
  return (dispatch, getState) => {
    const {
      loading,
      lastRequest,
    } = getState();

    clearTimeout(requestTimeout);
    dispatch(setQuery(query));

    if (!loading && query) {
      requestTimeout = setTimeout(() => {
        dispatch(getBooksThunk());
      }, 1000);
    }
  };
};


