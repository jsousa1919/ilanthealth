import axios from 'axios';
import React, { useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import ListComponent from './components/list.tsx';
import SearchComponent from './components/search.tsx';
import booksReducer from './components/reducers.tsx';


const HeaderComponent = () => (
  <div>
    <h1 className="block font-bold text-green-800 text-3xl mb-4">Ilant Book Repository</h1>
  </div>
);


const store = createStore(booksReducer, applyMiddleware(thunk));

export default function Index() {
  return (
    <Provider store={store}>
      <div className="p-2">
        <HeaderComponent />
        <SearchComponent />
        <ListComponent />
      </div>
    </Provider>
  );
};
