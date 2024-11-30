import * as fs from 'fs';

export const createDataSourceConfig = () => {

    console.log('createDataSourceConfig');

    try {


        const content = `
const { DataSource } = require('typeorm');

const config = new DataSource({
    type: 'postgres',
    host: "${process.env.DB_HOST}",
    port: "${process.env.DB_PORT}",
    username: "${process.env.DB_USERNAME}",
    password: "${process.env.DB_PASSWORD}",
    database: "${process.env.DB_DATABASE}",
    entities: ['dist/**/*.entity.js'], 
    migrations: ['dist/migrations/*.js'],
    synchronize: ${process.env.NODE_ENV === 'test'}, // set to false in production
});

module.exports = { config };
    `;

        if (!fs.existsSync('.data-source.config.js')) {
            fs.writeFileSync('.data-source.config.js', content, 'utf8');
            console.log('File has been created');
        }
    } catch (e) {
        console.log('Error: ', e);
    }
}