import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner_Entity } from '../owners/owners.entity';
import { OwnersModule } from '../owners/owners.module';
import { StorageService } from '../storage/services/storage.service';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { Offer_Entity } from '../offers/models/offer.entity';
import { Prospection_Entity } from './entities/prospection.entity';
import { Seller_Entity } from './entities/seller.entity';
import { ProspectionsController } from './prospections.controller';
import { ProspectionsDbService } from './services/prospections.db.service';
import { ProspectionsService } from './services/prospections.service';
import { SellersDbService } from './services/sellers.db.service';
import { ProspectionSpreadsheetService } from './services/spreadsheets.prospection.service';

@Module({
    imports: [
        OwnersModule,
        TypeOrmModule.forFeature([
            User,
            Prospection_Entity,
            Seller_Entity,
            Offer_Entity, 
            Owner_Entity
        ])
    ],
    controllers: [ProspectionsController],
    providers: [ StorageService, ProspectionsService, ProspectionsDbService, ProspectionSpreadsheetService, SellersDbService, UsersService],
    exports: [ StorageService, ProspectionsService, ProspectionSpreadsheetService, ProspectionsDbService, UsersService]
})
export class ProspectionsModule {}
