FROM node:16-alpine

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Create cache directory and set permissions
RUN mkdir -p /app/node_modules/.cache && \
    chmod -R 777 /app/node_modules/.cache

# Set environment variables
ENV REACT_APP_API_URL=http://localhost:5000

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 