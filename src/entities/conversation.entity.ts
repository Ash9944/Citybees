import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Messages } from './messaging.entity';
import { ConversationMembers } from './conversationMembers.entity';

@Entity()
export class Conversations {
    @PrimaryGeneratedColumn('uuid')
    id : string;
    
    @Column({ unique : true})
    conversationId: string;

    @OneToMany(() => ConversationMembers, cm => cm.conversation, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
    })
    participants: ConversationMembers[];

    @OneToMany(() => Messages, msg => msg.conversation, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    messages: Messages[];

    @CreateDateColumn()
    createdAt: Date;
}