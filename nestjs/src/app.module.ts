import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './services/typeorm.service';
import { EstatesModule } from './estates/estates.module';
import { userModule } from './user/user.module';
import { OwnersModule } from './owners/owners.module';
import { LodgersModule } from './lodgers/lodgers.module';
import { RentsModule } from './rents/rents.module';
import { ProspectionsModule } from './prospections/prospections.module';
import { createDataSourceConfig } from './scripts/create-datasource.script';

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
    ProspectionsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 

  constructor(){
    createDataSourceConfig()
  }

}
