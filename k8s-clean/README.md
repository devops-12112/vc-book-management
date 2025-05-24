# Kubernetes Manifests for MERN Library Application

This directory contains the necessary Kubernetes manifests for deploying the MERN Library application.

## Structure

- `namespace.yaml`: Defines the mern-library-ns namespace
- `mongodb/`: MongoDB deployment and service
- `backend/`: Backend deployment, service, configmap, and secret
- `frontend/`: Frontend deployment, service, and configmap

## Deployment

To deploy the application:

1. Apply the namespace first:
   ```
   kubectl apply -f namespace.yaml
   ```

2. Apply MongoDB resources:
   ```
   kubectl apply -f mongodb/
   ```

3. Apply backend resources:
   ```
   kubectl apply -f backend/
   ```

4. Apply frontend resources:
   ```
   kubectl apply -f frontend/
   ```

5. Set up port forwarding:
   ```
   kubectl port-forward -n mern-library-ns service/frontend-service 3000:3000 &
   kubectl port-forward -n mern-library-ns service/backend-service 5000:5000 &
   ```

6. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/books
