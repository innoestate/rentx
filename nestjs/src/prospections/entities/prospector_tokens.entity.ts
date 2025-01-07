import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('prospector_tokens')
export class Prospector_tokens_Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column()
    tokens: number;
}