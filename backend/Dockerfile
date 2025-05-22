FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# The port will be provided through docker-compose environment variables
ARG PORT
ENV PORT=$PORT

EXPOSE 5000

CMD ["npm", "start"] 