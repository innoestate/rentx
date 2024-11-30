import { Estate } from "src/estates/estate.entity";
import { Lodger_Entity } from "src/lodgers/lodger.entity";
import { Owner_Entity } from "src/owners/owners.entity";
import { User } from "src/user/user.entity";


export const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Owner_Entity, Lodger_Entity, Estate], 
    migrations: ['**/migrations/*.js'],// [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'test', // set to false in production
    drpopSchema: process.env.NODE_ENV === 'test',
};