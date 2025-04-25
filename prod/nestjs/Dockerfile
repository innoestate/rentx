FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY dist ./dist
COPY .env.production .env.production
COPY start.sh ./start.sh
RUN apk add --no-cache netcat-openbsd && \
    chmod +x ./start.sh
ENV NODE_ENV=production
EXPOSE 3000
CMD ["./start.sh"]
