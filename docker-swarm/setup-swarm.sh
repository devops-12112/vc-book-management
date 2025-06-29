#!/bin/bash

# Docker Swarm Setup Script for MERN Library Application
set -e

echo "🚀 Setting up Docker Swarm for MERN Library Application..."

# Initialize Docker Swarm (if not already initialized)
if ! docker info | grep -q "Swarm: active"; then
    echo "📋 Initializing Docker Swarm..."
    docker swarm init
else
    echo "✅ Docker Swarm already initialized"
fi

# Create secrets
echo "🔐 Creating Docker secrets..."
echo "mongo_user" | docker secret create mongo_root_username - 2>/dev/null || echo "Secret mongo_root_username already exists"
echo "mongo_secure_password_123" | docker secret create mongo_root_password - 2>/dev/null || echo "Secret mongo_root_password already exists"
echo "mongodb://mongo_user:mongo_secure_password_123@mongo:27017/library?authSource=admin" | docker secret create mongodb_uri - 2>/dev/null || echo "Secret mongodb_uri already exists"

# Create configs
echo "⚙️  Creating Docker configs..."
docker config create backend_config ./backend-config.json 2>/dev/null || echo "Config backend_config already exists"
docker config create frontend_config ./frontend-env.production 2>/dev/null || echo "Config frontend_config already exists"
docker config create nginx_config ./nginx.conf 2>/dev/null || echo "Config nginx_config already exists"

# Deploy the stack
echo "🚢 Deploying MERN Library stack..."
docker stack deploy -c docker-compose.swarm.yml mern-library

echo "⏳ Waiting for services to start..."
sleep 30

# Show stack status
echo "📊 Stack Status:"
docker stack services mern-library

echo "🔍 Service Details:"
docker service ls

echo "✅ MERN Library application deployed successfully!"
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost/api"
echo "   Direct Backend: http://localhost:5000"
echo "   MongoDB: localhost:27017"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker service logs mern-library_<service-name>"
echo "   Scale service: docker service scale mern-library_<service-name>=<replicas>"
echo "   Remove stack: docker stack rm mern-library"