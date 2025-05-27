# MERN Library Application Troubleshooting Guide

## Common Issues and Solutions

### 1. 404 Not Found Error

If you're getting a 404 Not Found error when accessing the application:

1. **Check if all pods are running:**
   ```bash
   kubectl get pods -n mern-library-ns
   ```
   All pods should show `Running` status and be `Ready 1/1`.

2. **Verify ingress controller is running:**
   ```bash
   kubectl get pods -n ingress-nginx
   ```
   The ingress-nginx-controller pod should be running.

3. **Check ingress configuration:**
   ```bash
   kubectl describe ingress -n mern-library-ns
   ```
   Ensure the host and paths are correctly configured.

4. **Verify endpoints are registered:**
   ```bash
   kubectl get endpoints -n mern-library-ns
   ```
   All services should have endpoints listed.

5. **Check host entry in /etc/hosts:**
   ```bash
   cat /etc/hosts | grep mern-library.local
   ```
   Should show: `127.0.0.1 mern-library.local`

### 2. Frontend Pod Crashing

If the frontend pod is crashing or in CrashLoopBackOff:

1. **Check pod logs:**
   ```bash
   kubectl logs -n mern-library-ns $(kubectl get pods -n mern-library-ns -l app=frontend -o jsonpath='{.items[0].metadata.name}')
   ```

2. **Increase memory limits** if you see OOMKilled errors.

3. **Set NODE_ENV to production** to avoid development server issues.

### 3. Backend API Not Accessible

If the frontend loads but API calls fail:

1. **Check backend logs:**
   ```bash
   kubectl logs -n mern-library-ns $(kubectl get pods -n mern-library-ns -l app=backend -o jsonpath='{.items[0].metadata.name}')
   ```

2. **Verify the API URL in frontend configmap:**
   ```bash
   kubectl get configmap frontend-configmap -n mern-library-ns -o yaml
   ```
   Should have `REACT_APP_API_URL: "http://mern-library.local/api"`

3. **Test API directly:**
   ```bash
   curl -H "Host: mern-library.local" http://localhost/api/books
   ```

### 4. MongoDB Connection Issues

If the backend can't connect to MongoDB:

1. **Check MongoDB pod status:**
   ```bash
   kubectl describe pod -n mern-library-ns $(kubectl get pods -n mern-library-ns -l app=mongodb -o jsonpath='{.items[0].metadata.name}')
   ```

2. **Verify MongoDB service:**
   ```bash
   kubectl get svc mongo-service -n mern-library-ns
   ```

3. **Check backend environment variables:**
   ```bash
   kubectl describe configmap backend-configmap -n mern-library-ns
   kubectl describe secret backend-secrets -n mern-library-ns
   ```

## Quick Reset

If you want to start fresh:

```bash
# Delete all resources in the namespace
kubectl delete namespace mern-library-ns

# Recreate namespace and resources
kubectl apply -f namespace/namespace.yaml
kubectl apply -f mongodb/
kubectl apply -f backend/
kubectl apply -f frontend/
kubectl apply -f ingress/
```