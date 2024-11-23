import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn
} from 'typeorm';


@Entity('lodgers')
@Index(['user_id', 'name'], { unique: true })  
export class Lodger_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid'})
    user_id: string;

    @Column()
    name: string;

    @Column()
    email: string;

}