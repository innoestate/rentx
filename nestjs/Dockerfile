FROM node:20-alpine

WORKDIR /app

COPY . /app

RUN npm install && npm run build && cp .env.production dist/.env

EXPOSE 3000

CMD ["npm", "run", "start"]
