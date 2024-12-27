import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Prospection_Entity } from './prospection.entity';

@Entity('offers')
export class Offer_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    price: number;

    @Column({ type: 'uuid' })
    prospection_id: string;

    @ManyToOne(() => Prospection_Entity, prospection => prospection.offers)
    @JoinColumn({ name: 'prospection_id' })
    prospection: Prospection_Entity;
}
