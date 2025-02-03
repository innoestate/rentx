import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Timestamp } from 'typeorm';

@Entity('prospector_ai_offers')
export class Prospector_ai_offers_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ type: 'uuid' })
    prospection_id: string;

    @Column({ type: 'uuid' })
    owner_id: string;

    @Column({ type: 'uuid' })
    seller_id: string;

    @Column('text')
    content: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Timestamp;
}
