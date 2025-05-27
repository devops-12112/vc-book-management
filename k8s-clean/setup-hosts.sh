#!/bin/bash

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (use sudo)"
  exit 1
fi

# Add entry to /etc/hosts if it doesn't exist
if ! grep -q "mern-library.local" /etc/hosts; then
  echo "127.0.0.1 mern-library.local" >> /etc/hosts
  echo "Added mern-library.local to /etc/hosts"
else
  echo "Entry already exists in /etc/hosts"
fi

echo "Setup complete. You can now access the application at http://mern-library.local"