import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversations } from "./conversation.entity";
import { User } from "./user.entity";

@Entity()
export class ConversationMembers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Conversations, conv => conv.participants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversations;

  @ManyToOne(() => User, user => user.conversations, { nullable: true })
  user: User;

  @CreateDateColumn()
  joinedAt: Date;
}
