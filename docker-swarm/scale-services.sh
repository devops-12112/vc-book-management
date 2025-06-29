#!/bin/bash

# Docker Swarm Service Scaling Script for MERN Library Application

echo "⚖️  MERN Library Service Scaling Tool"
echo "====================================="

# Function to show current replicas
show_current_replicas() {
    echo ""
    echo "📊 Current Service Replicas:"
    docker stack services mern-library --format "table {{.Name}}\t{{.Replicas}}"
}

# Function to scale a service
scale_service() {
    local service=$1
    local replicas=$2
    
    echo "🔄 Scaling $service to $replicas replicas..."
    docker service scale mern-library_$service=$replicas
    
    echo "⏳ Waiting for scaling to complete..."
    sleep 10
    
    echo "✅ Scaling completed!"
}

# Show current state
show_current_replicas

echo ""
echo "🎛️  Scaling Options:"
echo "1. Scale Frontend"
echo "2. Scale Backend" 
echo "3. Scale MongoDB"
echo "4. Scale All Services"
echo "5. Auto-scale based on load"
echo "6. Reset to default (2 replicas each)"
echo "7. Exit"

read -p "Choose an option (1-7): " choice

case $choice in
    1)
        read -p "Enter number of frontend replicas: " replicas
        scale_service "frontend" $replicas
        ;;
    2)
        read -p "Enter number of backend replicas: " replicas
        scale_service "backend" $replicas
        ;;
    3)
        read -p "Enter number of MongoDB replicas: " replicas
        scale_service "mongo" $replicas
        ;;
    4)
        read -p "Enter number of replicas for all services: " replicas
        scale_service "frontend" $replicas
        scale_service "backend" $replicas
        scale_service "mongo" $replicas
        ;;
    5)
        echo "🤖 Auto-scaling based on CPU usage..."
        # Simple auto-scaling logic
        cpu_usage=$(docker stats --no-stream --format "{{.CPUPerc}}" | sed 's/%//' | awk '{sum+=$1} END {print sum/NR}')
        if (( $(echo "$cpu_usage > 70" | bc -l) )); then
            echo "High CPU usage detected ($cpu_usage%). Scaling up..."
            scale_service "frontend" 3
            scale_service "backend" 3
        elif (( $(echo "$cpu_usage < 30" | bc -l) )); then
            echo "Low CPU usage detected ($cpu_usage%). Scaling down..."
            scale_service "frontend" 1
            scale_service "backend" 1
        else
            echo "CPU usage is normal ($cpu_usage%). No scaling needed."
        fi
        ;;
    6)
        echo "🔄 Resetting to default configuration..."
        scale_service "frontend" 2
        scale_service "backend" 2
        scale_service "mongo" 2
        ;;
    7)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
show_current_replicas