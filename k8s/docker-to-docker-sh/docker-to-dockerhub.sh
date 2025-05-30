#!/bin/bash
cd ../frontend 
docker build -t lalbudha47/mern-frontend:v1 .

cd ../backend
docker build -t lalbudha47/mern-backend:v1 .

# Push to Docker Hub
docker push lalbudha47/mern-frontend:v1
docker push lalbudha47/mern-backend:v1
