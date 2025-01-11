import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prospector_ai_view_summarize')
export class Prospector_ai_view_summarize_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    user_ID: string;

    @Column('text')
    summarize_long: string;

    @Column('text')
    summarize_short: string;
}
