const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Book = require('./models/book');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));

mongoose.connect('mongodb://localhost:27017/marvelCatalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Marvel Catalog API!');
})

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    cover_image: String,
    issueNumber: Number
  });

module.exports = Book;

// Get all books
app.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });

// POST route to add a new comic
app.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);  // Create a new comic using the data from the request body
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: 'Error adding new book', error });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error });
  }
});

// Get a specific book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Serve book content for reading (e.g., a PDF or HTML)
app.get('/books/:id/read', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Assuming the book content is stored as a file
    const bookContentPath = path.join(__dirname, 'books', `${book._id}.pdf`);
    res.sendFile(bookContentPath);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Start the server  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});