import axios from 'axios';
import React, { useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

export const SET_QUERY = 'SET_QUERY';
export const START_REQUEST = 'START_REQUEST';
export const BOOKS_RECEIVED = 'BOOKS_RECEIVED';
export const BOOKS_FAILED = 'BOOKS_FAILED';

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

const API_URL = 'https://ilanthealth-api.netscaping.com/';
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

export function updateQueryThunk(value) {
  return (dispatch, getState) => {
    const {
      loading,
    } = getState();

    dispatch(setQuery(value));

    if (!loading) {
      dispatch(getBooksThunk());
    }
  };
};
