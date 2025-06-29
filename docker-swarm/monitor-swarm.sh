#!/bin/bash

# Docker Swarm Monitoring Script for MERN Library Application

# Check if stack exists
check_stack() {
    if ! docker stack ls | grep -q "mern-library"; then
        echo "❌ Stack 'mern-library' not found. Please deploy first with ./setup-swarm.sh"
        exit 1
    fi
}

# Function to show service status
show_services() {
    echo ""
    echo "🚀 Services Status:"
    docker stack services mern-library 2>/dev/null || echo "No services found"
}

# Function to show service logs
show_logs() {
    echo ""
    echo "📝 Recent Logs:"
    echo "Frontend logs:"
    docker service logs --tail 5 mern-library_frontend 2>/dev/null || echo "No frontend service"
    echo ""
    echo "Backend logs:"
    docker service logs --tail 5 mern-library_backend 2>/dev/null || echo "No backend service"
    echo ""
    echo "MongoDB logs:"
    docker service logs --tail 5 mern-library_mongo 2>/dev/null || echo "No mongo service"
}

# Function to show running containers
show_containers() {
    echo ""
    echo "📦 Running Containers:"
    docker ps --filter "label=com.docker.stack.namespace=mern-library" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || echo "No containers found"
}

# Function to test health endpoints
test_health() {
    echo ""
    echo "🏥 Health Checks:"
    
    # Test backend health endpoint
    if command -v curl >/dev/null 2>&1; then
        if curl -s -f http://localhost:5000/health >/dev/null 2>&1; then
            echo "✅ Backend: Healthy (port 5000)"
        else
            echo "❌ Backend: Unhealthy (port 5000)"
        fi
        
        if curl -s -f http://localhost:3000 >/dev/null 2>&1; then
            echo "✅ Frontend: Healthy (port 3000)"
        else
            echo "❌ Frontend: Unhealthy (port 3000)"
        fi
        
        if curl -s -f http://localhost >/dev/null 2>&1; then
            echo "✅ Nginx: Healthy (port 80)"
        else
            echo "❌ Nginx: Unhealthy (port 80)"
        fi
    else
        echo "⚠️  curl not available - skipping health checks"
        echo "   Install curl: apt-get install curl (Ubuntu) or yum install curl (CentOS)"
    fi
}

# Function to show stack info
show_stack_info() {
    echo ""
    echo "📊 Stack Information:"
    docker stack ps mern-library --format "table {{.Name}}\t{{.Node}}\t{{.DesiredState}}\t{{.CurrentState}}" 2>/dev/null || echo "No stack tasks found"
}

# Main function
main() {
    check_stack
    
    echo "📊 MERN Library Docker Swarm Monitor"
    echo "===================================="
    echo "Last updated: $(date)"
    
    show_services
    show_containers
    show_stack_info
    test_health
    
    echo ""
    echo "📋 Available commands:"
    echo "  ./monitor-swarm.sh logs    - Show recent logs"
    echo "  ./monitor-swarm.sh watch   - Continuous monitoring"
    echo "  docker service ls          - List all services"
    echo "  docker stack ps mern-library - Show stack tasks"
}

# Handle command line arguments
case "${1:-}" in
    "logs")
        check_stack
        show_logs
        ;;
    "watch")
        check_stack
        echo "Starting continuous monitoring... (Press Ctrl+C to exit)"
        while true; do
            clear
            main
            echo ""
            echo "🔄 Refreshing in 10 seconds..."
            sleep 10
        done
        ;;
    *)
        main
        ;;
esac