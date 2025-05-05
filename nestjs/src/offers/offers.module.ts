import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner_Entity } from '../owners/owners.entity';
import { OwnersModule } from '../owners/owners.module';
import { Prospection_Entity } from '../prospections/entities/prospection.entity';
import { ProspectionsDbService } from '../prospections/services/prospections.db.service';
import { ProspectionsStorageService } from '../storage/services/storage.service';
import { User } from '../user/data/user.entity';
import { UserModule } from '../user/user.module';
import { Offer_Entity } from './models/offer.entity';
import { OffersController } from './offers.controler';
import { OffersDbService } from './services/offers.db.service';
import { OffersService } from './services/offers.service';
import { Seller_Entity } from 'src/sellers/models/seller.entity';
import { SellersDbService } from 'src/prospections/services/sellers.db.service';

@Module({
    imports: [
        OwnersModule,
        UserModule,
        TypeOrmModule.forFeature([
            User,
            Offer_Entity, 
            Prospection_Entity,
            Seller_Entity,
            Owner_Entity
        ])
    ],
    controllers: [OffersController],
    providers: [ ProspectionsStorageService, OffersService, OffersDbService, ProspectionsDbService, SellersDbService],
    exports: [ ProspectionsStorageService, OffersService, OffersDbService, ProspectionsDbService, SellersDbService]
})
export class OffersModule {}
