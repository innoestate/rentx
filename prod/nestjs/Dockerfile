FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY dist ./dist
COPY .env.production .env.production
ENV NODE_ENV=production
EXPOSE 3000
CMD npm run migration:run && npm run start:prod
# CMD ["npm", "run", "start:prod"]
