import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Offer_Entity } from '../../offers/models/offer.entity';

@Entity('prospections')
export class Prospection_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    seller_id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ nullable: true})
    city: string;

    @Column({ nullable: true})
    status: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    link: string;

    @Column({ nullable: true})
    price: number;

    @Column({nullable: true})
    counter_proposal: number;

    @Column({ type: 'timestamp', nullable: true })
    emission_date: Date;

    @Column({ type: 'uuid', nullable: true })
    offer_id: string;

    @Column({ nullable: true })
    construction_cost: number;

    @Column({ type: 'json', nullable: true })
    rents: any;

    @Column({ type: 'text', nullable: true })
    resume: string;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @Column({ nullable: true })
    storage_folder_id: string;

    @OneToMany(() => Offer_Entity, offer => offer.prospection, { cascade: true })
    offers: Offer_Entity[];
}
