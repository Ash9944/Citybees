import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Conversations } from './conversation.entity';

@Entity()
export class Messages {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Conversations, conv => conv.messages, { eager: true })
    @JoinColumn({ name: 'conversationId' })
    conversation: Conversations

    @Column("text")
    content: string;

    @Column()
    senderId : string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
