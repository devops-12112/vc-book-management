#!/bin/bash

# Create kind cluster with custom configuration
echo "Creating kind cluster..."
kind create cluster --name mern-library --config kind-config.yaml

# Install NGINX Ingress Controller for kind
echo "Installing NGINX Ingress Controller..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# Wait for ingress controller to be ready
echo "Waiting for ingress controller to be ready..."
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s

# Apply Kubernetes manifests
echo "Applying Kubernetes manifests..."
kubectl apply -f namespace/namespace.yaml
kubectl apply -f mongodb/
kubectl apply -f backend/
kubectl apply -f frontend/
kubectl apply -f ingress/

# Add host entry to /etc/hosts (requires sudo)
echo "Adding host entry to /etc/hosts..."
echo "To access your application, please add the following entry to your /etc/hosts file:"
echo "127.0.0.1 mern-library.local"
echo "Run: sudo sh -c 'echo \"127.0.0.1 mern-library.local\" >> /etc/hosts'"

echo "Setup complete! Your MERN application should be accessible at http://mern-library.local once all pods are running."
echo "Check pod status with: kubectl get pods -n mern-library-ns"