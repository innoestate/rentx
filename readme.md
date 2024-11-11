FOR PRODUCTION

install docker, docker-compose, git and certbot in the VPS

run certbot to build certificates for rentx.fr, www.rentx.fr and api.rentx.fr


to run the project on dev with docker: 
go on root project and run: 

docker-compose -f docker-compose.dev.yml up --build

to restart: 

docker-compose -f docker-compose.dev.yml down

then again 

docker-compose -f docker-compose.dev.yml up --build