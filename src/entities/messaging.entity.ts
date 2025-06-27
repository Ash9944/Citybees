import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Conversations } from './conversation.entity';
import { User } from './user.entity';

@Entity()
export class Messages {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Conversations, conv => conv.messages, { eager: true })
    @JoinColumn({ name: 'conversationId' })
    conversation: Conversations

    @Column("text")
    content: string;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: false })
    isRead: boolean

    @UpdateDateColumn()
    updatedAt: Date;
}
