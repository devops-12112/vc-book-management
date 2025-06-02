#!/bin/bash
cd ../../frontend
docker build -t lalbudha47/mern-frontend:v2.0.0 .

cd ../../backend
docker build -t lalbudha47/mern-backend:v2.0.0 .

# Push to Docker Hub
docker push lalbudha47/mern-frontend:v2.0.0
docker push lalbudha47/mern-backend:v2.0.0

