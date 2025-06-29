#!/bin/bash

# Docker Swarm Teardown Script for MERN Library Application
set -e

echo "🗑️  Tearing down MERN Library Docker Swarm stack..."

# Remove the stack
echo "📦 Removing stack..."
docker stack rm mern-library

echo "⏳ Waiting for stack removal..."
sleep 15

# Remove configs
echo "⚙️  Removing configs..."
docker config rm backend_config 2>/dev/null || echo "Config backend_config not found"
docker config rm frontend_config 2>/dev/null || echo "Config frontend_config not found"
docker config rm nginx_config 2>/dev/null || echo "Config nginx_config not found"

# Remove secrets
echo "🔐 Removing secrets..."
docker secret rm mongo_root_username 2>/dev/null || echo "Secret mongo_root_username not found"
docker secret rm mongo_root_password 2>/dev/null || echo "Secret mongo_root_password not found"
docker secret rm mongodb_uri 2>/dev/null || echo "Secret mongodb_uri not found"

# Remove volumes (optional - uncomment if you want to remove data)
# echo "💾 Removing volumes..."
# docker volume rm mern-library_mongo_data 2>/dev/null || echo "Volume not found"

echo "✅ MERN Library stack removed successfully!"
echo ""
echo "📋 To completely clean up:"
echo "   Remove volumes: docker volume prune"
echo "   Remove networks: docker network prune"
echo "   Leave swarm: docker swarm leave --force"