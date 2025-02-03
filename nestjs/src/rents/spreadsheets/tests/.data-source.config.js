
const { DataSource } = require('typeorm');

const config = new DataSource({
    type: 'postgres',
    host: "undefined",
    port: "undefined",
    username: "undefined",
    password: "undefined",
    database: "undefined",
    entities: ['dist/**/*.entity.js'], 
    migrations: ['dist/migrations/*.js'],
    synchronize: true, // set to false in production
});

module.exports = { config };
    