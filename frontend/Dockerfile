FROM node:20-slim

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Create cache directory and set permissions
RUN mkdir -p /app/node_modules/.cache && \
    chmod -R 777 /app/node_modules/.cache

# The API URL will be provided through docker-compose environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 