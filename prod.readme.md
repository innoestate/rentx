FOR PRODUCTION

install docker, docker-compose, git and certbot in the VPS

run certbot to build certificates for rentx.fr, www.rentx.fr and api.rentx.fr


to run the project on dev with docker: 
go on root project and run: 

docker-compose -f docker-compose.dev.yml up --build


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

sudo apt install -y certbot




IF problem of ssh connection after restarting EC2 instance ?
check /var/root/.ssh/known_host and remove concerned host. (because the local machine try to protect you)
or run sudo ssh-keygen -R ec2-13-36-119-43.eu-west-3.compute.amazonaws.com (the name of old a)



to restart: 

docker-compose -f docker-compose.dev.yml down

then again 

docker-compose -f docker-compose.dev.yml up --build


To update project: 

connect on the VPS
go on the folder rentx.fr
pull the branch
run docker-compose up --build