import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from '../owners/owners.module';
import { StorageService } from '../storage/services/storage.service';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { OffersController } from './offers.controler';
import { OffersDbService } from './services/offers.db.service';
import { OffersService } from './services/offers.service';
import { Offer_Entity } from './models/offer.entity';
import { Prospection_Entity } from '../prospections/entities/prospection.entity';
import { ProspectionsDbService } from '../prospections/services/prospections.db.service';
import { Owner_Entity } from '../owners/owners.entity';

@Module({
    imports: [
        OwnersModule,
        TypeOrmModule.forFeature([
            User,
            Offer_Entity, 
            Prospection_Entity,
            Owner_Entity
        ])
    ],
    controllers: [OffersController],
    providers: [ StorageService, OffersService, OffersDbService, ProspectionsDbService, UsersService],
    exports: [ StorageService, OffersService]
})
export class OffersModule {}
