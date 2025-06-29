# 🚀 MERN Library - Docker Swarm Deployment Guide

Complete step-by-step guide to deploy your MERN Library application using Docker Swarm with production-ready configuration.

## 📋 Prerequisites

1. **Docker Engine** 20.10+ installed
2. **Docker Hub account** (or private registry)
3. **Minimum 2 nodes** for true high availability (optional)
4. **4GB RAM** and **2 CPU cores** minimum

## 🏗️ Step 1: Prepare Your Environment

### Initialize Docker Swarm
```bash
# On manager node
docker swarm init

# If you have multiple nodes, join workers:
# docker swarm join --token <token> <manager-ip>:2377
```

### Verify Swarm Status
```bash
docker node ls
docker info | grep Swarm
```

## 🔨 Step 2: Build and Push Images

### Option A: Use Existing Script
```bash
cd k8s/docker-to-docker-sh
./docker-to-dockerhub.sh
```

### Option B: Manual Build
```bash
# Build Frontend
cd frontend
docker build -t lalbudha47/mern-frontend:v1 .
docker push lalbudha47/mern-frontend:v1

# Build Backend  
cd ../backend
docker build -t lalbudha47/mern-backend:v1 .
docker push lalbudha47/mern-backend:v1
```

## 🚢 Step 3: Deploy to Swarm

### Navigate to Swarm Directory
```bash
cd docker-swarm
```

### Run Setup Script
```bash
./setup-swarm.sh
```

This script will:
- ✅ Initialize Docker Swarm (if needed)
- 🔐 Create secrets for MongoDB credentials
- ⚙️ Create configs for application settings
- 🚢 Deploy the complete stack
- 📊 Show deployment status

## 🔍 Step 4: Verify Deployment

### Check Services
```bash
docker stack services mern-library
docker service ls
```

### Check Service Health
```bash
# Individual service logs
docker service logs mern-library_frontend
docker service logs mern-library_backend
docker service logs mern-library_mongo

# Monitor dashboard
./monitor-swarm.sh
```

### Test Application
```bash
# Frontend
curl http://localhost

# Backend API
curl http://localhost:5000/health
curl http://localhost/api/books

# Through Nginx
curl http://localhost/health
```

## 🎛️ Step 5: Management Operations

### Scaling Services
```bash
# Interactive scaling tool
./scale-services.sh

# Manual scaling
docker service scale mern-library_frontend=3
docker service scale mern-library_backend=4
```

### Rolling Updates
```bash
# Update frontend
docker service update --image lalbudha47/mern-frontend:v2 mern-library_frontend

# Update backend
docker service update --image lalbudha47/mern-backend:v2 mern-library_backend
```

### View Real-time Monitoring
```bash
./monitor-swarm.sh
```

## 🔧 Step 6: Configuration Management

### Update Configurations
```bash
# Remove old config
docker config rm backend_config

# Create new config
docker config create backend_config ./backend-config.json

# Update service to use new config
docker service update --config-rm backend_config --config-add backend_config mern-library_backend
```

### Update Secrets
```bash
# Create new secret
echo "new_password" | docker secret create mongo_root_password_v2 -

# Update service
docker service update --secret-rm mongo_root_password --secret-add mongo_root_password_v2 mern-library_mongo
```

## 🚨 Step 7: Troubleshooting

### Common Issues and Solutions

#### Services Not Starting
```bash
# Check service status
docker service ps mern-library_frontend --no-trunc

# Check logs
docker service logs mern-library_frontend

# Check node resources
docker node ls
docker system df
```

#### Network Connectivity Issues
```bash
# Inspect network
docker network inspect mern-library_mern_network

# Test connectivity between services
docker exec -it $(docker ps -q -f name=mern-library_backend) ping mongo
```

#### Database Connection Issues
```bash
# Check MongoDB logs
docker service logs mern-library_mongo

# Verify secrets
docker secret ls
docker secret inspect mongo_root_password

# Test database connection
docker exec -it $(docker ps -q -f name=mern-library_mongo) mongosh -u mongo_user -p
```

#### Resource Constraints
```bash
# Check resource usage
docker stats

# Update resource limits
docker service update --limit-memory 512M mern-library_backend
```

## 📊 Step 8: Monitoring and Maintenance

### Health Monitoring
```bash
# Continuous monitoring
./monitor-swarm.sh

# Check service health
docker service ps mern-library_frontend
docker service ps mern-library_backend
docker service ps mern-library_mongo
```

### Log Management
```bash
# View recent logs
docker service logs --tail 50 mern-library_backend

# Follow logs in real-time
docker service logs -f mern-library_frontend

# Export logs
docker service logs mern-library_backend > backend.log
```

### Backup Strategy
```bash
# Backup MongoDB data
docker exec $(docker ps -q -f name=mern-library_mongo) mongodump --out /backup

# Backup volumes
docker run --rm -v mern-library_mongo_data:/data -v $(pwd):/backup alpine tar czf /backup/mongo-backup.tar.gz /data
```

## 🔄 Step 9: Updates and Rollbacks

### Rolling Updates
```bash
# Update with zero downtime
docker service update --image lalbudha47/mern-frontend:v2 --update-parallelism 1 --update-delay 10s mern-library_frontend
```

### Rollback
```bash
# Rollback to previous version
docker service rollback mern-library_frontend
```

### Blue-Green Deployment
```bash
# Create new stack version
docker stack deploy -c docker-compose.swarm.yml mern-library-v2

# Switch traffic (update nginx config)
# Remove old stack
docker stack rm mern-library
```

## 🧹 Step 10: Cleanup

### Remove Stack
```bash
./teardown-swarm.sh
```

### Complete Cleanup
```bash
# Remove all unused resources
docker system prune -a

# Leave swarm (if needed)
docker swarm leave --force
```

## 🔐 Security Best Practices

### Secrets Management
- ✅ Use Docker secrets for sensitive data
- ✅ Rotate secrets regularly
- ✅ Never store secrets in images or configs

### Network Security
- ✅ Use overlay networks for isolation
- ✅ Implement proper firewall rules
- ✅ Use TLS for external communication

### Container Security
- ✅ Run containers as non-root users
- ✅ Use minimal base images
- ✅ Regularly update images
- ✅ Scan images for vulnerabilities

## 📈 Performance Optimization

### Resource Tuning
```bash
# Optimize based on monitoring data
docker service update --limit-memory 256M --reserve-memory 128M mern-library_backend
```

### Database Optimization
- Configure connection pooling
- Optimize MongoDB indexes
- Monitor query performance

### Load Balancing
- Configure Nginx for optimal performance
- Use health checks effectively
- Implement proper caching strategies

## 🎯 Production Checklist

- [ ] Docker Swarm initialized
- [ ] Images built and pushed to registry
- [ ] Secrets created and secured
- [ ] Configs deployed
- [ ] Services deployed with 2+ replicas
- [ ] Health checks configured
- [ ] Monitoring dashboard active
- [ ] Backup strategy implemented
- [ ] Update/rollback procedures tested
- [ ] Security measures in place
- [ ] Performance optimized
- [ ] Documentation updated

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review service logs
3. Consult Docker Swarm documentation
4. Check GitHub issues

---

🎉 **Congratulations!** Your MERN Library application is now running in a production-ready Docker Swarm cluster with high availability, load balancing, and proper security measures.