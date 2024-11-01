FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]