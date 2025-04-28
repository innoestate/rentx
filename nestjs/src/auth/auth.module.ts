import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/data/user.entity';
import { UserModule } from '../user/user.module';
import { OwnersModule } from '../owners/owners.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    ConfigModule,
    UserModule,
    OwnersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,// configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '60d',
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, GoogleStrategy],
  exports: [JwtModule, PassportModule]
})
export class AuthModule {}