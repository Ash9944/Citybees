import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Messages } from './messaging.entity';
import { ConversationMembers } from './conversationMembers.entity';
import { ticketStatus } from '../enums/admin.enums';

@Entity()
export class Conversations {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    isTicket: boolean;

    @Column({
        enum: ticketStatus,
        default: ticketStatus.OPEN
    })
    ticketStatus: ticketStatus;

    @Column({ type: 'text' })
    ticketSubject: string;

    @Column({ unique: true })
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

    @OneToOne(() => Messages, { nullable: true })
    @JoinColumn()
    lastMessage: Messages;

    @Column()
    isActive : boolean;
}