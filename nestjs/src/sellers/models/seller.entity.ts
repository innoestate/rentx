import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

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

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    zip: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    agency: string;
}
