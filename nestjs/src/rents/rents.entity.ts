import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('rents')
@Index(['estate_id', 'lodger_id', 'start_date', 'end_date'], { unique: true })  
export class Rent_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid'})
    estate_id: string;

    @Column({ type: 'uuid'})
    lodger_id: string;

    @Column({ type: 'date'})
    start_date: string;

    @Column({ type: 'date'})
    end_date: string;

    @Column({ type: 'number'})
    rent: string;

    @Column({ type: 'number'})  
    charges: string;

}