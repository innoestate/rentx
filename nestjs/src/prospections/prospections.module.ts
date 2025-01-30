import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner_Entity } from '../owners/owners.entity';
import { OwnersModule } from '../owners/owners.module';
import { StorageService } from '../storage/services/storage.service';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { Offer_Entity } from '../offers/models/offer.entity';
import { Prospection_Entity } from './entities/prospection.entity';
import { Seller_Entity } from '../sellers/models/seller.entity';
import { ProspectionsController } from './prospections.controller';
import { ProspectionsDbService } from './services/prospections.db.service';
import { ProspectionsService } from './services/prospections.service';
import { SellersDbService } from './services/sellers.db.service';
import { DocsDbService } from '../docs/docs.db.service';
import { Docs_Entity } from '../docs/docs.entity';
import { SpreadSheetsProspectionsService } from './spreadsheets/services/spreadsheets.prospections.service';

@Module({
    imports: [
        OwnersModule,
        TypeOrmModule.forFeature([
            User,
            Prospection_Entity,
            Seller_Entity,
            Offer_Entity, 
            Owner_Entity,
            Docs_Entity
        ])
    ],
    controllers: [ProspectionsController],
    providers: [ StorageService, ProspectionsService, ProspectionsDbService, SellersDbService, DocsDbService, UsersService, SpreadSheetsProspectionsService],
    exports: [ StorageService, ProspectionsService, ProspectionsDbService, DocsDbService, UsersService, SellersDbService, SpreadSheetsProspectionsService]
})
export class ProspectionsModule {}
