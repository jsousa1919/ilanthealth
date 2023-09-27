import axios from 'axios';
import React, { useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { SET_QUERY, START_REQUEST, BOOKS_RECEIVED, BOOKS_FAILED } from './actions';


const INITIAL_STATE = {
  books: [],
  loading: false,
  query: '',
  error: '',
};

export default function booksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case START_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOOKS_RECEIVED:
      return {
        ...state,
        loading: false,
        books: action.books,
      };
    case BOOKS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};


