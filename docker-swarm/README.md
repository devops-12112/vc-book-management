# MERN Library - Docker Swarm Setup

Complete production-ready Docker Swarm configuration for the MERN Library application with 2 replicas each for frontend, backend, and database.

## 🏗️ Architecture

- **Frontend**: React app (2 replicas)
- **Backend**: Node.js/Express API (2 replicas)  
- **Database**: MongoDB (2 replicas)
- **Load Balancer**: Nginx (1 replica)
- **Secrets Management**: Docker secrets for sensitive data
- **Configuration**: Docker configs for application settings

## 📁 Files Structure

```
docker-swarm/
├── docker-compose.swarm.yml    # Main swarm compose file
├── nginx.conf                  # Nginx load balancer config
├── backend-config.json         # Backend production config
├── frontend-env.production     # Frontend environment config
├── setup-swarm.sh             # Setup and deployment script
├── teardown-swarm.sh          # Cleanup script
├── monitor-swarm.sh           # Monitoring dashboard
├── scale-services.sh          # Service scaling tool
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker Engine 20.10+
- Docker images built and pushed to registry:
  - `lalbudha47/mern-frontend:v1`
  - `lalbudha47/mern-backend:v1`

### 1. Build and Push Images
```bash
# From project root
cd k8s/docker-to-docker-sh
./docker-to-dockerhub.sh
```

### 2. Deploy to Swarm
```bash
cd docker-swarm
chmod +x *.sh
./setup-swarm.sh
```

### 3. Access Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **Direct Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

## 🛠️ Management Commands

### Monitor Services
```bash
./monitor-swarm.sh
```

### Scale Services
```bash
./scale-services.sh
```

### View Logs
```bash
docker service logs mern-library_frontend
docker service logs mern-library_backend
docker service logs mern-library_mongo
```

### Update Services
```bash
docker service update --image lalbudha47/mern-frontend:v2 mern-library_frontend
docker service update --image lalbudha47/mern-backend:v2 mern-library_backend
```

### Remove Stack
```bash
./teardown-swarm.sh
```

## 🔐 Security Features

### Secrets Management
- MongoDB credentials stored as Docker secrets
- Database URI secured with secrets
- No sensitive data in compose files

### Network Security
- Overlay network isolation
- Internal service communication
- Nginx reverse proxy

### Resource Limits
- Memory limits for all services
- CPU reservations
- Health checks for all services

## 📊 Production Features

### High Availability
- 2 replicas for each service
- Automatic restart on failure
- Rolling updates with rollback

### Load Balancing
- Nginx load balancer
- Round-robin distribution
- Health check endpoints

### Monitoring
- Built-in health checks
- Service monitoring dashboard
- Resource usage tracking

### Scaling
- Horizontal scaling support
- Auto-scaling capabilities
- Dynamic replica adjustment

## 🔧 Configuration

### Environment Variables
- Production-ready settings
- Configurable through Docker configs
- Separate frontend/backend configs

### Database Configuration
- MongoDB replica set ready
- Persistent volume storage
- Connection pooling optimized

### Nginx Configuration
- Reverse proxy setup
- Static file serving
- API route handling

## 🚨 Troubleshooting

### Common Issues

1. **Services not starting**
   ```bash
   docker service ls
   docker service logs mern-library_<service>
   ```

2. **Network connectivity issues**
   ```bash
   docker network ls
   docker network inspect mern-library_mern_network
   ```

3. **Secret/Config issues**
   ```bash
   docker secret ls
   docker config ls
   ```

### Health Checks
All services include health checks:
- Frontend: HTTP check on port 3000
- Backend: `/health` endpoint
- MongoDB: `mongosh` ping command
- Nginx: `/health` endpoint

### Scaling Issues
- Ensure sufficient resources on nodes
- Check placement constraints
- Monitor resource usage

## 📈 Performance Tuning

### Resource Optimization
- Adjust memory limits based on usage
- Monitor CPU utilization
- Scale replicas based on load

### Database Optimization
- Configure MongoDB connection pooling
- Adjust timeout settings
- Monitor database performance

### Network Optimization
- Use overlay network efficiently
- Optimize Nginx configuration
- Enable compression if needed

## 🔄 Updates and Maintenance

### Rolling Updates
```bash
docker service update --image new-image:tag service-name
```

### Backup Strategy
- MongoDB data persisted in volumes
- Regular database backups recommended
- Configuration backup through Git

### Monitoring and Alerts
- Use monitoring dashboard
- Set up external monitoring (Prometheus/Grafana)
- Configure alerts for service failures

## 📝 Notes

- Modify `nginx.conf` for custom routing
- Update resource limits based on your infrastructure
- Customize health check intervals as needed
- Consider using Docker secrets for additional sensitive data