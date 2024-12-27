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

    @Column()
    city: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    link: string;

    @Column({ type: 'uuid', nullable: true })
    seller_id: string;

    @Column()
    price: number;

    @Column({ type: 'timestamp' })
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

    @ManyToMany(() => Seller_Entity)
    @JoinTable({
        name: 'prospection_sellers',
        joinColumn: { name: 'prospection_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'seller_id', referencedColumnName: 'id' }
    })
    sellers: Seller_Entity[];

    @OneToMany(() => Offer_Entity, offer => offer.prospection)
    offers: Offer_Entity[];
}
