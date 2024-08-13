import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookGrid = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="grid-container">
      {books.map(book => (
        <div key={book._id} className="grid-item" onClick={() => handleBookClick(book._id)}>
          <img src={book.cover_image} alt={book.title} />
          <div className="details">
            <h3>{book.title}</h3>
            <p>{book.rating} ★</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const handleBookClick = (id) => {
  window.location.href = `/book/${id}`;
};

export default BookGrid;