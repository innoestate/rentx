import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './services/typeorm.service';
import { EstatesModule } from './estates/estates.module';
import { UserModule } from './user/user.module';
import { OwnersModule } from './owners/owners.module';
import { LodgersModule } from './lodgers/lodgers.module';
import { RentsModule } from './rents/rents.module';
import { ProspectionsModule } from './prospections/prospections.module';
import { createDataSourceConfig } from './scripts/create-datasource.script';
import { OffersModule } from './offers/offers.module';
import { AlphaUsersModule } from './alphaUsers/alphaUsers.module';
import { DevModule } from './dev/dev.module';
import * as bodyParser from 'body-parser';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env.production',
        '.env'
      ],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    EstatesModule,
    OwnersModule,
    LodgersModule,
    RentsModule,
    ProspectionsModule,
    OffersModule,
    AlphaUsersModule,
    ...(process.env.NODE_ENV === 'development' ? [DevModule] : []),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule { 

  constructor(){
    createDataSourceConfig()
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        bodyParser.raw({ type: 'application/pdf', limit: '10mb' }), // Handle PDF data
      )
      .forRoutes('api/prospections/offers/add'); // Apply only to the specific route
  }

}
