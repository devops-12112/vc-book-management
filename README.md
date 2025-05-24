# MERN Library Management System on Kubernetes

This project is a library management system built with the MERN stack (MongoDB, Express, React, Node.js) and deployed on Kubernetes.

## Prerequisites

- Docker
- Kind (Kubernetes in Docker)
- kubectl
- Node.js and npm (for local development)

## Setting up the Kind Cluster

1. Create a Kind cluster using the provided configuration:

```bash
kind create cluster --name mern-library-cluster --config kind-cluster-config.yaml
```

2. Install the NGINX Ingress Controller:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

3. Wait for the ingress controller to be ready:

```bash
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
```

## Deploying the Application

1. Add the following entry to your `/etc/hosts` file:

```
127.0.0.1 mern-library.local
```

2. Run the build and deploy script:

```bash
./build-and-deploy.sh
```

This script will:
- Build the frontend and backend Docker images
- Load the images into the Kind cluster
- Apply all Kubernetes manifests
- Wait for all pods to be ready

## Accessing the Application

Once deployed, you can access the application at:

- Frontend: http://mern-library.local
- Backend API: http://mern-library.local/api

## Troubleshooting

If you encounter issues:

1. Check pod status:
```bash
kubectl get pods -n mern-library-ns
```

2. Check pod logs:
```bash
kubectl logs -n mern-library-ns <pod-name>
```

3. Check service status:
```bash
kubectl get services -n mern-library-ns
```

4. Check ingress status:
```bash
kubectl get ingress -n mern-library-ns
```

## Architecture

The application consists of three main components:

1. **Frontend**: React application
2. **Backend**: Node.js/Express API
3. **Database**: MongoDB

These components are deployed as separate services in Kubernetes, with an Ingress controller routing traffic to the appropriate service.

## Kubernetes Resources

- **Namespace**: `mern-library-ns`
- **Deployments**: Frontend, Backend, MongoDB
- **Services**: Frontend, Backend, MongoDB
- **ConfigMaps**: Frontend, Backend
- **Secrets**: Backend (MongoDB URI)
- **PersistentVolumeClaim**: MongoDB
- **Ingress**: Routes traffic to Frontend and Backend services