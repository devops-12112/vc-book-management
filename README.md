# MERN Library Management System

A Kubernetes-deployed library management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

- `backend/`: Node.js/Express API server
- `frontend/`: React frontend application
- `k8s/`: Kubernetes configuration files
  - `backend/`: Backend deployment, service, and config
  - `frontend/`: Frontend deployment, service, and config
  - `db/`: MongoDB deployment, service, and persistent volume
  - `ingress/`: Ingress controller and routing rules

## Setup Instructions

### Prerequisites

- Docker
- Kubernetes cluster (e.g., Kind, Minikube, or a cloud provider)
- kubectl CLI

### Setup Steps

1. **Set up hosts file entry**:
   ```
   ./setup-hosts.sh
   ```

2. **Start the application**:
   ```
   ./start-app.sh
   ```

3. **Access the application**:
   Open your browser and navigate to:
   ```
   http://mern.example.com:8080
   ```

## Features

- Browse books by genre
- Add new books to the library
- Edit book details
- Archive/restore books
- Delete books permanently

## Architecture

- **Frontend**: React SPA served by Nginx
- **Backend**: Express.js REST API
- **Database**: MongoDB
- **Networking**: Kubernetes Ingress for routing

## Kubernetes Components

- Deployments for frontend, backend, and MongoDB
- Services for internal communication
- Persistent Volume for MongoDB data
- Ingress for external access and routing
- ConfigMaps and Secrets for configuration

## Troubleshooting

If you encounter any issues:

1. Check pod status: `kubectl get pods`
2. Check logs: `kubectl logs -l app=frontend` or `kubectl logs -l app=backend`
3. Ensure the ingress controller is running: `kubectl get pods -n ingress-nginx`