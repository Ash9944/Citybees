import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { PersonalDocuments } from './personalDocuments.entity';
import { ProviderBusiness } from './providerBuisness.entity';
import { ConversationMembers } from './conversationMembers.entity';

@Entity()
export class Technicians {
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

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'text' })
  nationality: string;

  @OneToOne(() => PersonalDocuments, documents => documents.technician, { cascade: true })
  documents: PersonalDocuments;

  @ManyToOne(() => ProviderBusiness, buisness => buisness.technicians)
  @JoinColumn({ 'name': 'buisnessId' })
  buisness: ProviderBusiness

  @Column()
  buisnessId: string

  @Column()
  primaryRole: string;

  @Column({ array: true, type: 'text', nullable: true })
  secondaryRole: string[];

  @Column({ 'type': 'text' })
  serviceLocation: string;

  @Column({ 'type': 'text' })
  secondaryServiceLocation: string;

  @OneToMany(() => ConversationMembers, convMembers => convMembers.technician , {onDelete : "CASCADE"})
  conversations: ConversationMembers[];
}