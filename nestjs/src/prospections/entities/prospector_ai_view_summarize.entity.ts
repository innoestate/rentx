import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity('prospector_ai_view_summarize')
export class Prospector_ai_view_summarize_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column('text')
    summarize_long: string;

    @Column('text')
    summarize_short: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Timestamp;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Timestamp;
}
