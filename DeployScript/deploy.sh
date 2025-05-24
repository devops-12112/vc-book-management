#!/bin/bash
set -e

NAMESPACE="mern-library-ns"

# Apply Kubernetes manifests
kubectl apply -f k8s-clean/all-in-one.yaml

# Wait for pods to be ready
echo "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=mongo -n $NAMESPACE --timeout=120s || true
kubectl wait --for=condition=ready pod -l app=backend -n $NAMESPACE --timeout=120s || true
kubectl wait --for=condition=ready pod -l app=frontend -n $NAMESPACE --timeout=120s || true

# Kill any existing port-forwarding
pkill -f "kubectl port-forward" || true

# Set up port forwarding
echo "Setting up port forwarding..."
kubectl port-forward -n $NAMESPACE service/frontend-service 3000:3000 &
kubectl port-forward -n $NAMESPACE service/backend-service 5000:5000 &

echo "Application is now accessible at http://localhost:3000"
echo "API is accessible at http://localhost:5000/api/books"