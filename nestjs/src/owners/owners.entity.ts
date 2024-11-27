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

    @Column()
    name: string;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    zip: string;

    @Column()
    signature: string;

    @Column()
    email: string;

    @Column()
    phone: string;

}