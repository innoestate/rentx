import { Client } from 'pg';
import { User_Db } from 'src/user/models/user-db.model';

export const dropAllTables = async () => {

    const client = new Client({
        host: 'postgres',  
        port: 5432,
        user: 'test',
        password: 'test',
        database: 'test',
    });

    try {
        await client.connect();
        const query = `
            SELECT tablename
            FROM pg_tables
            WHERE schemaname = 'public';
        `;

        const res = await client.query(query);
        const tables = res.rows.map(row => row.tablename);

        if (tables.length === 0) {
            console.log('No tables found in the database.');
        } else {
            const dropedTables = [];
            for (const table of tables) {
                await client.query(`DROP TABLE IF EXISTS ${table} CASCADE;`);
                dropedTables.push(table)
            }
            console.log('All tables dropped successfully.', dropedTables);
        }
    } catch (err) {
        console.error('Error while dropping tables:', err);
    } finally {
        await client.end();
    }
}

export const emptyingTable = async (tableName: string) => {
    const client = new Client({
        host: 'postgres',
        port: 5432,
        user: 'test',
        password: 'test',
        database: 'test',
    });

    try {
        await client.connect();
        await client.query(`DELETE FROM ${tableName};`);
    } catch (err) {
        console.error(`Error while emptying table ${tableName}:`, err);
    } finally {
        await client.end();
    }
}

export const createUser = async (user: {email: string, name: string}): Promise<User_Db> => {
    const client = new Client({
        host: 'postgres',
        port: 5432,
        user: 'test',
        password: 'test',
        database: 'test',
    });

    try {
        await client.connect();
        const user_ =  await client.query(`INSERT INTO users (email, name) VALUES ($1, $2)`, [user.email, user.name]);
        console.log('user', user);
        return user_;
    } catch (err) {
        console.error(`Error while creating user:`, err);
    } finally {
        await client.end();
    }
}