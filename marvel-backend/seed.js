const mongoose = require('mongoose');
const Book = require('./models/book');

mongoose.connect('mongodb://localhost:27017/marvelCatalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedBooks = async () => {
  try {
    await Book.deleteMany({});  // Clear existing data

    const books = [
      { title: 'Spider-Man: Homecoming', author: 'Stan Lee', cover_image: 'https://example.com/spiderman.jpg', rating: 4.5 },
      { title: 'Testando', author: 'Chris Claremont', cover_image: 'https://example.com/xmen.jpg', rating: 4.8 },
    ];

    await Book.insertMany(books);
    console.log('Database seeded successfully!');
    mongoose.connection.close(); // Close the connection after seeding
  } catch (error) {
    console.error('Error seeding the database:', error);
    mongoose.connection.close();
  }
};

seedBooks();