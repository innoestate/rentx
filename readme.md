FOR PRODUCTION

install docker, docker-compose, git and certbot in the VPS

run certbot to build certificates for rentx.fr, www.rentx.fr and api.rentx.fr


to run the project on dev with docker: 
go on root project and run: 

docker-compose -f docker-compose.dev.yml up --build


Install docker in AWS Linux 2: 

https://www.cyberciti.biz/faq/how-to-install-docker-on-amazon-linux-2/

sudo yum update

sudo yum search docker

sudo yum info docker

sudo yum install docker

IF problem of ssh connection after restarting EC2 instance ?
check /var/root/.ssh/known_host and remove concerned host. (because the local machine try to protect you)
or run sudo ssh-keygen -R ec2-13-36-119-43.eu-west-3.compute.amazonaws.com (the name of old aws host)



to restart: 

docker-compose -f docker-compose.dev.yml down

then again 

docker-compose -f docker-compose.dev.yml up --build