import { Rent_Entity } from "src/rents/rents.entity";
import { Estate } from "../estates/estate.entity";
import { Lodger_Entity } from "../lodgers/lodger.entity";
import { Owner_Entity } from "../owners/owners.entity";
import { User } from "../user/user.entity";


export const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Owner_Entity, Lodger_Entity, Estate, Rent_Entity], 
    migrations: ['**/migrations/*.js'],// [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'test', // set to false in production
    drpopSchema: process.env.NODE_ENV === 'test',
};