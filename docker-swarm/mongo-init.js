// MongoDB initialization script for MERN Library
db = db.getSiblingDB('library');

// Create collections
db.createCollection('books');

// Insert sample data
db.books.insertMany([
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    publishedYear: 1925,
    genre: "Fiction",
    available: true,
    createdAt: new Date()
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    publishedYear: 1960,
    genre: "Fiction",
    available: true,
    createdAt: new Date()
  }
]);

print('Database initialized with sample data');