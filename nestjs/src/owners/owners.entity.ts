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

    @Column({ length: 100})
    street: string;

    @Column({ length: 100})
    city: string;

    @Column({ length: 100})
    zip: string;

    @Column({ type: 'text'})
    signature: string;

    @Column({ length: 100})
    email: string;

    @Column({ length: 100})
    phone: string;

}