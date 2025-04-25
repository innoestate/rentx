procédure: 

1- créer un repertoire hors du projet et le connecter a github
2- créer une instance AWS avec git, docker, docker-compose
3- builder la prod en lancant build:prod <path du repertoire>
4- pusher le repo sur github puis le puller sur l'instance
//si besoin lancer le scrip init-letsencrypt.sh en utilisant: "sudo ./init-letsencrypt.sh"
5- aller sur l'instance et lancer docker-compose up -d 


npm run build:prod <target_path> (exemple: npm run build:prod ../prod)

- create a private git repository and push the repository
- create an AWS Amazon Linux instance and connect in ssh

ssh -i "prod.pem" ec2-user@ec2-35-180-210-208.eu-west-3.compute.amazonaws.com
ssh -i "prod.pem" ec2-user@ec2-13-36-119-43.eu-west-3.compute.amazonaws.com

sudo dnf update -y
sudo dnf install git -y

sudo dnf install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
//exit and reconnect to instance

sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.7/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose


