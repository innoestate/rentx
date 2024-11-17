import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from './../user/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {

    // console.log('node-env', this.configService.get<string>('NODE_ENV'));


  }


  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config = {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [User],// [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: this.configService.get<string>('NODE_ENV') === 'test', // set to false in production
      drpopSchema: this.configService.get<string>('NODE_ENV') === 'test',
      autoLoadEntities: true,
    };
    // console.log('config', config);
    return config as TypeOrmModuleOptions;
  }
}