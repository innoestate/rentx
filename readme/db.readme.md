checker une DB en test (voir les tables): 

docker-compose -f docker-compose.test.yml

aller sur un autre terminal

docker exec -it postgres_test bash
docker exec -it postgres bash


psql -U test -d test
psql -U dev -d rentx_dev


SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';


ajouter des tokens: 

1- chercher l'id de l'utilisteur
SELECT * FROM users WHERE email = 'test@test.com';
2- ajouter le token dans la table tokens ex:
INSERT INTO prospector_tokens (user_id, tokens) VALUES ('48f21f45-7f32-4c19-9550-eacc2f7b5604', 1000000);