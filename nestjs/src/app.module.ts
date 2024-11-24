import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { EstatesModule } from './estates/estates.module';
import { DatabaseInitService } from './services/database-init.service';
import { userModule } from './user/user.module';
import { OwnersModule } from './owners/owners.module';
import { LodgersModule } from './lodgers/lodgers.module';
import { RentsModule } from './rents/rents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    AuthModule,
    userModule,
    EstatesModule,
    OwnersModule,
    LodgersModule,
    RentsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseInitService],
})
export class AppModule { }
