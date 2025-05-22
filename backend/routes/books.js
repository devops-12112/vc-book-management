const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books with filters
router.get('/', async (req, res) => {
  try {
    const { genre, isArchived } = req.query;
    const filter = {};
    
    if (genre) {
      filter.genre = genre;
    }
    
    // Only show archived books if specifically requested
    filter.isArchived = isArchived === 'true';

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available genres
router.get('/genres', async (req, res) => {
  try {
    res.json(Book.GENRES);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create book
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    Object.assign(book, req.body);
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Archive book
router.put('/:id/archive', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    book.isArchived = true;
    book.archivedAt = new Date();
    await book.save();
    
    res.json({ message: 'Book archived successfully', book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Restore book from archive
router.put('/:id/restore', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    book.isArchived = false;
    book.archivedAt = null;
    await book.save();
    
    res.json({ message: 'Book restored successfully', book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete book (permanent delete)
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    await book.deleteOne();
    res.json({ message: 'Book deleted permanently' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 