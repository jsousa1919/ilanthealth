import React from 'react';
import { connect } from 'react-redux';
import { updateQueryThunk } from './actions';

function SearchComponent({ dispatch, query, onUpdateQuery }) {
  return (
    <div className="container justify-center mx-auto px-6">
      <input
        type="text"
        className="block border border-slate-300 rounded-md p-4 w-full text-lg"
        placeholder="Enter search terms"
        value={query}
        onChange={event => dispatch(updateQueryThunk(event.target.value))}
      />
      <div className="text-sm text-red-200 invisible peer-disabled:visible">Loading...</div>
    </div>
  );
};

const mapStateToProps = (state) => ({ query: state.query });
export default connect(mapStateToProps)(SearchComponent);


