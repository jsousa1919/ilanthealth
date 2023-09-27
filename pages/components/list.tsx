import React, { ReactElement } from 'react';
import { connect } from 'react-redux';


const BookTileComponent = ({ bookObj }) => {
  const {
    authors,
    description,
    imageLinks,
    title,
    infoLink,
  } = bookObj.volumeInfo;

  const imageSrc: string = imageLinks && (imageLinks.smallThumbnail || imageLinks.thumbnail) || '';
  const authorsText: string = authors && authors.join(', ') || 'Unknown';
  const descriptionText: string = description && description.slice(0, 500) || '';

  return (
    <a href={infoLink} className="flex flex-col mb-4 md:mb-0 gap-1 md:gap-2 shadow-md rounded-md p-2 md:p-4 hover:shadow-2xl bg-white hover:bg-blue-100">
      <div className="md:max-h-48 lg:max-g-96 text-center">
        <img alt={title} src={imageSrc} className="max-h-full mx-auto" />
      </div>
      <div title={title} className="text-l font-bold truncate">{title}</div>
      <div title={authorsText} className="font-semibold">By: {authorsText}</div>
      <div className="text-lightBlack line-clamp-3">{descriptionText}...</div>
    </a>
  );
};

function ListComponent({ books, error, loading }) {
  let content: ReactElement = (<div className="text-center text-xl font-bold">Nothing Found</div>);

  if (error) {
    content = (<div className="text-center text-red text-lg">{error}</div>);

  } else if (loading) {
    content = (<div className="text-red text-xl">Loading...</div>);

  } else if (books && books.length) {
    const bookTiles: ReactElement[] = books.map((bookObj) => bookObj.volumeInfo ? (
      <BookTileComponent key={bookObj.id} bookObj={bookObj} />
    ) : []);

    content = (
      <div className="m-2 md:m-4 lg:m-6 md:grid md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8 justify-between">
        {bookTiles}
      </div>
    );
  }

  return (
    <div className="bg-blue-100 border border-1 border-gray-1 rounded-md p-2 md:p-4 lg:p-8">
      {content}
    </div>
  );
}

const mapStateToProps = (state) => ({
  books: state.books,
  error: state.error,
  loading: state.loading,
});
export default connect(mapStateToProps)(ListComponent);


