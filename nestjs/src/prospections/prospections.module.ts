import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from '../owners/owners.module';
import { User } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { Offer_Entity } from './entities/offer.entity';
import { Prospection_Entity } from './entities/prospection.entity';
import { Seller_Entity } from './entities/seller.entity';
import { ProspectionsController } from './prospections.controller';
import { ProspectionsService } from './prospections.service';
import { Owner_Entity } from '../owners/owners.entity';

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
    providers: [ProspectionsService, UsersService],
    exports: [ProspectionsService, UsersService]
})
export class ProspectionsModule {}
