FROM node:20-alpine

WORKDIR /app

COPY . /app

RUN NODE_OPTIONS="--max-old-space-size=2048" npm install && npm run build --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
