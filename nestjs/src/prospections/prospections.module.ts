import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectionsController } from './prospections.controller';
import { ProspectionsService } from './prospections.service';
import { Prospection_Entity } from './entities/prospection.entity';
import { Seller_Entity } from './entities/seller.entity';
import { Offer_Entity } from './entities/offer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Prospection_Entity,
            Seller_Entity,
            Offer_Entity
        ])
    ],
    controllers: [ProspectionsController],
    providers: [ProspectionsService],
    exports: [ProspectionsService]
})
export class ProspectionsModule {}
