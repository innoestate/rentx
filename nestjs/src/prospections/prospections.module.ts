import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocsDbService } from '../docs/docs.db.service';
import { Docs_Entity } from '../docs/docs.entity';
import { Offer_Entity } from '../offers/models/offer.entity';
import { Owner_Entity } from '../owners/owners.entity';
import { OwnersModule } from '../owners/owners.module';
import { Seller_Entity } from '../sellers/models/seller.entity';
import { StorageService } from '../storage/services/storage.service';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { Prospection_Entity } from './entities/prospection.entity';
import { ProspectionsController } from './prospections.controller';
import { ProspectionsDbService } from './services/prospections.db.service';
import { ProspectionsService } from './services/prospections.service';
import { SellersDbService } from './services/sellers.db.service';
import { SpreadSheetsProspectionsService } from './spreadsheets/services/spreadsheets.prospections.service';

@Module({
    imports: [
        OwnersModule,
        UserModule,
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
    providers: [ StorageService, ProspectionsService, ProspectionsDbService, SellersDbService, DocsDbService, SpreadSheetsProspectionsService],
    exports: [ StorageService, ProspectionsService, ProspectionsDbService, DocsDbService, SellersDbService, SpreadSheetsProspectionsService]
})
export class ProspectionsModule {}
