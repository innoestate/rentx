import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn
} from 'typeorm';



@Entity('estates')
@Index(['user_id', 'street', 'city', 'zip', 'plot'], { unique: true })  
export class Estate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid'})
    user_id: string;

    @Column()
    owner_id: string;

    @Column()
    lodger_id: string;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    zip: string;

    @Column()
    plot: string;

    @Column()
    rent: number;

    @Column()
    charges: number;

}