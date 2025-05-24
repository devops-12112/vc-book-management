import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  Archive,
  Unarchive,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [viewMode, setViewMode] = useState('active'); // 'active' or 'archived'
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchGenres();
  }, [selectedGenre, viewMode]);

  const fetchBooks = async () => {
    try {
      const params = {
        isArchived: viewMode === 'archived'
      };
      if (selectedGenre) {
        params.genre = selectedGenre;
      }
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books`, { params });
      setBooks(response.data);
    } catch (error) {
      toast.error('Error fetching books');
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/genres`);
      setGenres(response.data);
    } catch (error) {
      toast.error('Error fetching genres');
    }
  };

  const handleArchive = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/books/${id}/archive`);
      toast.success('Book archived successfully');
      fetchBooks();
    } catch (error) {
      toast.error('Error archiving book');
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/books/${id}/restore`);
      toast.success('Book restored successfully');
      fetchBooks();
    } catch (error) {
      toast.error('Error restoring book');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this book?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/books/${id}`);
        toast.success('Book deleted permanently');
        fetchBooks();
      } catch (error) {
        toast.error('Error deleting book');
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Library Books
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Genre</InputLabel>
            <Select
              value={selectedGenre}
              label="Filter by Genre"
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newMode) => {
              if (newMode !== null) {
                setViewMode(newMode);
              }
            }}
          >
            <ToggleButton value="active">Active Books</ToggleButton>
            <ToggleButton value="archived">Archived Books</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={book.coverImage}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By {book.author}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={book.genre}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Available: {book.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/book/${book._id}`)}
                >
                  <Visibility />
                </IconButton>
                {!book.isArchived && (
                  <>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/edit/${book._id}`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="warning"
                      onClick={() => handleArchive(book._id)}
                    >
                      <Archive />
                    </IconButton>
                  </>
                )}
                {book.isArchived && (
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => handleRestore(book._id)}
                  >
                    <Unarchive />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(book._id)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookList; 