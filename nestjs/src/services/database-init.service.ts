import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource, private configService: ConfigService) { }

  async onModuleInit() {
    await this.createTableIfNotExists();
  }

  private async resetTables(queryRunner) {

    if (await queryRunner.hasTable('estates')) {
      await queryRunner.query(`
        DROP TABLE estates;
        `);
    }
    if (await queryRunner.hasTable('owners')) {
      await queryRunner.query(`
      DROP TABLE owners;
    `);
    }
    if (await queryRunner.hasTable('lodgers')) {
      await queryRunner.query(`
      DROP TABLE lodgers;
    `);
    }
    if (await queryRunner.hasTable('users')) {
      await queryRunner.query(`
        DROP TABLE users;
        `);
    }
  }

  private async createTableIfNotExists() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    if(this.configService.get('NODE_ENV') === 'development') {
      // await this.resetTables(queryRunner);
    }

    const userTableExists = await queryRunner.hasTable('users');
    if (!userTableExists) {
      console.log('new user table created');
      await queryRunner.query(`
        CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(100),
          refresh_token VARCHAR(100),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);
    }

    const estatesTableExists = await queryRunner.hasTable('estates');
    if (!estatesTableExists) {
      console.log('new estates table created');
      await queryRunner.query(`
        CREATE TABLE estates (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

    const ownerTableExists = await queryRunner.hasTable('owners');
    if (!ownerTableExists) {
      console.log('new owners table created');
      await queryRunner.query(`
        CREATE TABLE owners (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL,
          name VARCHAR(100),
          street VARCHAR(100),
          city VARCHAR(100),
          zip VARCHAR(100),
          signature VARCHAR(100),
          email VARCHAR(100),
          phone VARCHAR(100),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);
      // await queryRunner.query(`
      //   ALTER TABLE owners
      //   ADD CONSTRAINT fk_owners_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
      // `);
    }


    const lodgersTableExists = await queryRunner.hasTable('lodgers');
    if (!lodgersTableExists) {
      console.log('new lodgers table created');
      await queryRunner.query(`
        CREATE TABLE lodgers (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL,
          name VARCHAR(100),
          email VARCHAR(100),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);
    }


    await queryRunner.release();
  }
}
