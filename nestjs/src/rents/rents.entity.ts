import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('rents')
@Index(['user_id', 'estate_id', 'lodger_id', 'start_date', 'end_date'], { unique: true })  
export class Rent_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid'})
    user_id: string;

    @Column({ type: 'uuid'})
    estate_id: string;

    @Column({ type: 'uuid'})
    lodger_id: string;

    @Column({ type: 'date'})
    start_date: Date;

    @Column({ type: 'date'})
    end_date: Date;

    @Column()
    rent: number;

    @Column()  
    charges: number;

    @Column({ default: false})  
    sent: boolean;

}