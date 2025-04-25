#!/bin/sh

echo "Waiting for database to be ready..."
# Wait for database to be ready
while ! nc -z postgres 5432; do
  sleep 1
done

echo "Starting the application in background..."
npm run start:prod &

echo "Waiting for data source configuration..."
# Wait for data source config file to be created
while [ ! -f ".data-source.config.js" ]; do
  sleep 1
done

echo "Running database migrations..."
npm run typeorm migration:run

# Keep the container running by waiting for the background process
wait
