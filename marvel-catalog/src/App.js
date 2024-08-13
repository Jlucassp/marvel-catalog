import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import BookGrid from './components/BookGrid';
import BookDetails from './components/BookDetails';
import Header from './components/Header';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch books from the API
    axios.get('http://localhost:5000/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Router>
      <Header />
      <div className="app-container">
        <input 
          className="search-bar" 
          placeholder="Search comics..."
          value={searchTerm}
          onChange={handleSearchChange} 
          />
        <Routes>
          <Route path="/" element={<BookGrid books={books} searchTerm={searchTerm} />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;