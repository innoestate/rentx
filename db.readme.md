checker une DB en test (voir les tables): 

docker-compose -f docker-compose.test.yml

aller sur un autre terminal

docker exec -it postgres_test bash
docker exec -it postgres bash


psql -U test -d test
psql -U dev -d rentx_dev


SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';