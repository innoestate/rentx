import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany
} from 'typeorm';
import { Prospection_Entity } from './prospection.entity';

@Entity('sellers')
export class Seller_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    user_id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @ManyToMany(() => Prospection_Entity)
    prospections: Prospection_Entity[];
}
