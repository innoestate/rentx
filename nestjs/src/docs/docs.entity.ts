import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('docs')
@Index(['user_id'], { unique: true })  
export class Docs_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid'})
    user_id: string;

    @Column()
    rents_google_sheet_id: string;
}