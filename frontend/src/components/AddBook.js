import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem
} from '@mui/material';
import { toast } from 'react-toastify';

const AddBook = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: '',
    genre: '',
    description: '',
    quantity: '',
    coverImage: ''
  });

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/genres`);
      setGenres(response.data);
    } catch (error) {
      toast.error('Error fetching genres');
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/books`, book);
      toast.success('Book added successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error adding book');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Book
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                value={book.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Author"
                name="author"
                value={book.author}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="ISBN"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                label="Published Year"
                name="publishedYear"
                value={book.publishedYear}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Genre"
                name="genre"
                value={book.genre}
                onChange={handleChange}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                label="Quantity"
                name="quantity"
                value={book.quantity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cover Image URL"
                name="coverImage"
                value={book.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/book-cover.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={book.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Add Book
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBook; 