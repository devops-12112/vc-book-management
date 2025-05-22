const mongoose = require('mongoose');

const GENRES = [
  'Science Fiction',
  'Comic',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Non-Fiction',
  'Biography',
  'History',
  'Children',
  'Other'
];

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: GENRES,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  coverImage: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  archivedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Create a static property for genres
bookSchema.statics.GENRES = GENRES;

module.exports = mongoose.model('Book', bookSchema); 