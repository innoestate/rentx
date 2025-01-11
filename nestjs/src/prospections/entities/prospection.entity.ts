import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from 'typeorm';
import { Seller_Entity } from './seller.entity';
import { Offer_Entity } from './offer.entity';

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

    @OneToMany(() => Offer_Entity, offer => offer.prospection)
    offers: Offer_Entity[];
}
