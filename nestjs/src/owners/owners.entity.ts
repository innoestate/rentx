import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn
} from 'typeorm';



@Entity('owners')
@Index(['user_id', 'name', 'street', 'city', 'zip'], { unique: true })  
export class Owner_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid'})
    user_id: string;

    @Column({ length: 100})
    name: string;

    @Column({ length: 100, nullable: true})
    street: string;

    @Column({ length: 100, nullable: true})
    city: string;

    @Column({ length: 100, nullable: true})
    zip: string;

    @Column({ type: 'text', nullable: true})
    signature: string;

    @Column({ length: 100, nullable: true})
    email: string;

    @Column({ length: 100, nullable: true})
    phone: string;

}