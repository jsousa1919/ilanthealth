import axios from 'axios';
import React, { useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';


const BookTileComponent = ({ bookObj }) => {
  const {
    authors,
    description,
    imageLinks,
    title,
  } = bookObj.volumeInfo;

  const imageSrc = imageLinks && (imageLinks.smallThumbnail || imageLinks.thumbnail) || '';

  return (
    <div className="border border-size-300 rounded-md p-4">
      <img src={imageSrc} />
      <div className="text-l font-semibold">{bookObj.title}</div>
      <div className="mb-2">By: {authors && authors.join(', ')}</div>
      <div>{description}</div>
    </div>
  );
};

function ListComponent({ books }) {
  return (
    <div className="flex justify-space columns-4">
      {books.map((bookObj) => bookObj.volumeInfo && (
        <BookTileComponent key={bookObj.id} bookObj={bookObj} />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({ books: state.books});
export default connect(mapStateToProps)(ListComponent);


