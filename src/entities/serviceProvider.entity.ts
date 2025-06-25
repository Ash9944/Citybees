import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { PersonalDocuments } from './personalDocuments.entity';
import { ProviderBusiness } from './providerBuisness.entity';
import { ConversationMembers } from './conversationMembers.entity';

@Entity()
export class ServiceProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({ type: 'text', nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  dateOfBirth: string;

  @Column({ type: 'text' })
  nationality: string;

  @OneToOne(() => PersonalDocuments, (documents) => documents.user, { cascade: true })
  documents: PersonalDocuments;

  @Column({ type: 'text', nullable: true })
  profilePicture: string;

  @OneToMany(() => ProviderBusiness, (provider) => provider.serviceProvider)
  providerBusinesses: ProviderBusiness[]

  @OneToMany(() => ConversationMembers, convMembers => convMembers.serviceProvider , {onDelete : "CASCADE"})
  conversations: ConversationMembers[];
}
