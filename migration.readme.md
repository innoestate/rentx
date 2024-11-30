MAKE MIGRATION 

1- run the project (whatever you are in development or production)

2- go in the container nestj, from the root project:
     docker exec -ti nestjs sh

3- run the script to generate migration file
    npm run typeorm migration:generate migrations/nameOfTheMigration

4- run the script to run typeorm migration
    npm run typeorm migration:run
