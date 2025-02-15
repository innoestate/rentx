FOR DEV

to run the project on dev with docker: 
go on root project and run: 

docker-compose -f docker-compose.dev.yml up --build


FOR PRODUCTION

Go in your instance

ex: sudo ssh -i "prod_rentx.pem" admin@ec2-13-36-119-43.eu-west-3.compute.amazonaws.com


install docker, docker-compose, git and certbot in the VPS

upload project from git and upload .env from your computer on the root project and .env.production in the nestjs folder

run certbot to build certificates for rentx.fr, www.rentx.fr and api.rentx.fr


On a Debian VPS: 

sudo apt update && sudo apt upgrade -y

sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

sudo systemctl status docker
docker --version

(optionnal)
sudo usermod -aG docker $USER
newgrp docker


DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K[^"]+')

sudo curl -L "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version


install git: 

sudo apt install -y git


install certbot: 

sudo apt install -y certbot

sudo certbot certonly --standalone -d www.rentx.fr -d rentx.fr 

sudo git clone https://github.com/innoestate/rentx.git


cd rentx

sudo chmod 777 -R .


in a local terminal send the env files from the keys files: 




sudo docker-compose -f docker-compose.yml up 

sudo scp -i "prod_rentx.pem" ../.env admin@ec2-13-36-119-43.eu-west-3.compute.amazonaws.com:/home/admin/rentx/.env

sudo sudo scp -i "prod_rentx.pem" ../nestjs/.env.production admin@ec2-13-36-119-43.eu-west-3.compute.amazonaws.com:/home/admin/rentx/nestjs/.env.production


IF problem of ssh connection after restarting EC2 instance ?
check /var/root/.ssh/known_hosts and remove concerned host. (because the local machine try to protect you)
or run sudo ssh-keygen -R ec2-13-36-119-43.eu-west-3.compute.amazonaws.com (the name of old a)


to restart: 

docker-compose -f docker-compose.dev.yml down

then again 

docker-compose -f docker-compose.dev.yml up --build -d


go in the container nestj, from the root project:
    docker exec -ti nestjs sh

run the script to run typeorm migration
    npm run typeorm migration:run


TO UPDATE THE PROJECT

connect on the VPS
go on the folder rentx.fr
pull the branch
run docker-compose up --build


BUG

cannot load certificate "/etc/letsencrypt/live/rentx.fr/fullchain.pem": PEM_read_bio_X509_AUX()
-> sudo mkdir /etc/letsencrypt/live/rentx.fr
-> sudo cp /etc/letsencrypt/live/www.rentx.fr/privkey.pem /etc/letsencrypt/live/rentx.fr
-> sudo cp /etc/letsencrypt/live/www.rentx.fr/fullchain.pem /etc/letsencrypt/live/rentx.fr



PATCH PROD

