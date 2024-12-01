FROM node:20-alpine

WORKDIR /app

COPY . /app

RUN npm install && npm run build --production && rm -rf node_modules
