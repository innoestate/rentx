FROM node:20-alpine

WORKDIR /app

COPY . /app

RUN npm install && npm run build

VOLUME angular_dist_volume:/app/dist/angular
