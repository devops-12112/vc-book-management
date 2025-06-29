#!/bin/bash
set -e

echo "🏗️  Building MERN Library Docker Images..."

# Build Frontend
echo "📦 Building Frontend..."
cd ../../frontend 
docker build -t lalbudha47/mern-frontend:v1 .

# Build Backend
echo "📦 Building Backend..."
cd ../backend
docker build -t lalbudha47/mern-backend:v1 .

# Push to Docker Hub
echo "🚀 Pushing to Docker Hub..."
docker push lalbudha47/mern-frontend:v1
docker push lalbudha47/mern-backend:v1

echo "✅ Images built and pushed successfully!"
echo "Frontend: lalbudha47/mern-frontend:v1"
echo "Backend: lalbudha47/mern-backend:v1"
