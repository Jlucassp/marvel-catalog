import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookGrid from './components/BookGrid';

const books = [
  // Mock data: Replace with API data later
  { id: 1, title: 'Spider-Man', cover_image: 'https://static.wikia.nocookie.net/marveldatabase/images/5/5e/Motion_Picture_Funnies_Weekly_Vol_1_1.jpg/revision/latest?cb=20100122182911', rating: 4.5},
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookGrid books={books} />}  />
        <Route path="/book/:id" element={<h1>Book Details Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;