RUN FOR DEV

install docker and docker-compose.

Create .env in root folder ex: 
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
docker-compose -f docker-compose.dev.yml up --build

Open the browser on the http://localhost:4200
