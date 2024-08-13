import React, { useEffect, useState } from 'react';
import './BookGrid.css';

const BookGrid = ({ books, searchTerm }) => {

  const getHighlightedText = (text, highlight) => {
    // Split the text by the highlight term, include term itself into parts, ignoring case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ?
          <span key={i} style={{ backgroundColor: 'yellow' }}>{part}</span> :
          part
        )}
      </span>
    );
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="grid-container">
        {filteredBooks.map(book => (
          <div key={book._id} className="grid-item" onClick={() => handleBookClick(book._id)}>
            <img src={book.cover_image} alt={book.title} />
            <div className="details">
              <h3>{getHighlightedText(book.title, searchTerm)}</h3>
              <p>Issue #{book.issueNumber}</p>
            </div>
            <div className="more-options">•••</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const handleBookClick = (id) => {
  window.location.href = `/book/${id}`;
};

export default BookGrid;