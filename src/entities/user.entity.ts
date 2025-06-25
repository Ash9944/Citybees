import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinColumn } from 'typeorm';
import { Address } from './address.entity';
import { Bookings } from './booking.entity';
import { PersonalDocuments } from './personalDocuments.entity';
import { TenancyContract } from './tenancyContract.entity';
import { Vat } from './vat.entity';
import { OTP } from './otp.entity';
import { ServicesMaster } from './servicesMaster.entity';
import { ConversationMembers } from './conversationMembers.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ type: 'text', nullable: true })
  middleName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  countryCode: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'text', nullable: true })
  nationality: string;

  @OneToMany(() => Address, address => address.user, { cascade: true, nullable: true })
  addresses: Address[];

  @Column({ type: 'text', nullable: true })
  profilePicture: string;

  @OneToMany(() => Bookings, bookings => bookings.user, { cascade: true, nullable: true })
  bookings: Bookings[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToOne(() => PersonalDocuments, documents => documents.user, { cascade: true, nullable: true })
  documents: PersonalDocuments;

  @OneToOne(() => TenancyContract, documents => documents.user, { cascade: true, nullable: true })
  tenancyContract: TenancyContract;

  @OneToOne(() => Vat, vat => vat.user, { cascade: true, nullable: true })
  vat: Vat;

  @Column({ type: 'int', default: 0 })
  step: number;

  @ManyToMany(() => ServicesMaster , serviceMaster => serviceMaster.userQuickAccessServices, {onDelete : "CASCADE"})
  quickAccessServices : ServicesMaster[];

  @OneToMany(() => ConversationMembers , convMembers => convMembers.user , {onDelete : "CASCADE"})
  conversations : ConversationMembers[];
}
