import { Client } from 'pg';

export async function dropAllTables() {

    const client = new Client({
        host: 'postgres',  
        port: 5432,
        user: 'test',
        password: 'test',
        database: 'test',
    });

    try {
        // Connect to the database
        await client.connect();
        console.log('Connected to the database.');

        // Query to get all tables in the 'public' schema
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
            console.log(`Found ${tables.length} tables. Dropping them...`);
            // Generate and execute DROP TABLE statements
            for (const table of tables) {
                await client.query(`DROP TABLE IF EXISTS ${table} CASCADE;`);
                console.log(`Dropped table: ${table}`);
            }
            console.log('All tables dropped successfully.');
        }
    } catch (err) {
        console.error('Error while dropping tables:', err);
    } finally {
        // Close the database connection
        await client.end();
        console.log('Database connection closed.');
    }
}
