build production: 
cd angular
ng build
cd ../nestjs
//remove dist in rentx_prod
npm run build-prod
cd ../../rentx_prod
git add .
git commit -m "release 0.1.1"
git push origin main
cd ../rentx_nestjs-angular/keys
sudo ssh -i "prod_rentx.pem" admin@ec2-13-36-119-43.eu-west-3.compute.amazonaws.com
cd rentx_prod
sudo git pull origin main
sudo docker-compose down
sudo docker-compose up --build  -d
sudo docker exec -ti back sh
npm run typeorm migration:run