RUN FOR DEV

install docker and docker-compose.

Create .env in root project ex: 
GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_CLIENT_SECRET=<google_client_secret>
JWT_SECRET=<a_secret>
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=<a_password>
DB_DATABASE=rentx

create .env.development in nestjs ex: 
GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_CLIENT_SECRET=<google_client_secret>
JWT_SECRET=<a_secret>
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=<a_password>
DB_DATABASE=rentx
GOOGLE_CALLBACK_URL=http://localhost:4200/callback

run: 
    docker network create my-network
    docker-compose -f docker-compose.dev.yml up --build

go in the container nestj, from the root project:
    docker exec -ti nestjs sh

run the script to run typeorm migration
    npm run typeorm migration:run


Open the browser on the http://localhost:4200



BUG CAUSED BY FONTS: 

go in nestjs container:
docker exec -ti nestjs sh
cp -r src/assets dist/src/assets
