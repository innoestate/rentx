import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Timestamp } from 'typeorm';

@Entity('prospector_ai_view_history')
export class Prospector_ai_view_history_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column()
    model: string;

    @Column()
    role: string;

    @Column('text')
    content: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Timestamp;
}
