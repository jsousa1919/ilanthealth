import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
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
    <React.StrictMode>
      <Provider className="p-2" store={store}>
        <div className="p-2">
          <HeaderComponent />
          <SearchComponent />
          <div className="book-list p-2 md:p-8">
            <ListComponent />
          </div>
        </div>
      </Provider>
    </React.StrictMode>
  );
};
