const { Client } = require('pg');

const client = new Client({
  user: 'dev',
  host: 'localhost',
  database: 'rentx_dev',
  password: 'devpassword',
  port: 5432,
});

async function resetDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');

    await client.query('DROP SCHEMA public CASCADE;');
    console.log('Dropped schema public');

    await client.query('CREATE SCHEMA public;');
    console.log('Created schema public');

    // Add additional queries to reset the database state as needed

  } catch (err) {
    console.error('Error resetting the database:', err);
  } finally {
    await client.end();
    console.log('Disconnected from the database');
  }
}

resetDatabase();