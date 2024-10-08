const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  cover_image: { type: String, required: true },
  issueNumber: { type: Number, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;