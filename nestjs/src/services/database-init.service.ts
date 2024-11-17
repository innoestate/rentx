import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    await this.createTableIfNotExists();
  }

  private async createTableIfNotExists() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();


    const userTableExists = await queryRunner.hasTable('users');
    if (!userTableExists) {
      console.log('new user table created');
      await queryRunner.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(100),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);
    }

    // await queryRunner.query(`
    //   DROP TABLE estates;
    // `);

    const estatesTableExists = await queryRunner.hasTable('estates');
    if (!estatesTableExists) {
      console.log('new estates table created');
      await queryRunner.query(`
        CREATE TABLE estates (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(100),
          owner_id VARCHAR(100),
          lodger_id VARCHAR(100),
          city VARCHAR(100),
          street VARCHAR(100),
          zip VARCHAR(100),
          plot VARCHAR(100),
          rent REAL,
          charges REAL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          CONSTRAINT estates_unique UNIQUE (user_id, city, street, zip, plot)
        );
      `);
    }

    await queryRunner.release();
  }
}
