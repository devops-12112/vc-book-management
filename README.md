# Library Management System

A modern MERN stack application for managing a library's book collection. Built with MongoDB, Express.js, React.js, and Node.js, featuring a beautiful Material-UI interface.

## Features

- Add, edit, and delete books
- View detailed book information
- Modern and responsive UI
- Containerized with Docker
- RESTful API backend
- MongoDB database

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

## Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd library-management
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## Development Setup

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## API Endpoints

- GET /api/books - Get all books
- GET /api/books/:id - Get a specific book
- POST /api/books - Create a new book
- PUT /api/books/:id - Update a book
- DELETE /api/books/:id - Delete a book

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://mongodb:27017/library
PORT=5000
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 