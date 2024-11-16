Mise en production

Exemple avec Amazon AWS EC2 

- lancer une instance Debian (minimum small pour avoir minimum 2GO de RAM)
- se connecter a l'instance après avoir utilisé un elasticIP et configurer le domaine rentx
- installer Docker, docker-compose, git et certbot
- installer avec certbot nginx et obtenir les certificats rentx et www.rentx
- cloner le répertoire git https://github.com/innoestate/rentx
- uploader les fichiers .env avec scp dans le dossier de l'instance EC2 nestJS et racine
- run docker-compose up --build -d 


Problème de connection à l'instance EC2 known_host: 

IF problem of ssh connection after restarting EC2 instance ?
check /var/root/.ssh/known_host and remove concerned host. (because the local machine try to protect you)
or run sudo ssh-keygen -R ec2-13-36-119-43.eu-west-3.compute.amazonaws.com (the name of old a)


For dev mode run: 

docker-compose -f docker-compose.dev.yml up