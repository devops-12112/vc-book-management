import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import {
  Book as BookIcon,
  Person,
  Category,
  DateRange,
  LibraryBooks
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`);
      setBook(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching book details');
      navigate('/');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={book.coverImage}
              alt={book.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<Person />}
                label={`Author: ${book.author}`}
                variant="outlined"
              />
              <Chip
                icon={<Category />}
                label={`Genre: ${book.genre}`}
                variant="outlined"
              />
              <Chip
                icon={<DateRange />}
                label={`Published: ${book.publishedYear}`}
                variant="outlined"
              />
              <Chip
                icon={<LibraryBooks />}
                label={`Available: ${book.quantity}`}
                color={book.quantity > 0 ? 'success' : 'error'}
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              ISBN: {book.isbn}
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/edit/${book._id}`)}
              >
                Edit Book
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/')}
              >
                Back to List
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookDetails; 