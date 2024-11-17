import { Client } from 'pg';

export const  dropAllTables = async () => {

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
        console.log('Database connection closed.');
    }
}
