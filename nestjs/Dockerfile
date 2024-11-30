FROM node:20-alpine

WORKDIR /app

COPY . /app

RUN npm install && npm run build

EXPOSE 3000

COPY . ./
RUN npm run build


FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./

ENV NODE_ENV production
CMD ["npm", "run", "start:prod"]
