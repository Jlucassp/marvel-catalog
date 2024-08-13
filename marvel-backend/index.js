const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/book');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/marvelCatalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Marvel Catalog API!');
})

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    cover_image: String,
    rating: Number,
  });

module.exports = Book;

app.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });