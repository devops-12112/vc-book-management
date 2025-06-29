#!/bin/bash

echo "🧪 Testing Monitor Script..."

# Test basic monitoring
echo "1. Basic monitoring:"
./monitor-swarm.sh

echo ""
echo "2. Testing logs command:"
./monitor-swarm.sh logs

echo ""
echo "3. Available Docker commands:"
echo "   docker stack ls"
echo "   docker service ls"
echo "   docker stack services mern-library"

echo ""
echo "4. Manual health checks:"
echo "   curl http://localhost:5000/health"
echo "   curl http://localhost:3000"
echo "   curl http://localhost"

echo ""
echo "✅ Monitor script test completed!"