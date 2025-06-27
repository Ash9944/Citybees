import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './address.entity';
import { Bookings } from './booking.entity';
import { PersonalDocuments } from './personalDocuments.entity';
import { TenancyContract } from './tenancyContract.entity';
import { Vat } from './vat.entity';
import { ServicesMaster } from './servicesMaster.entity';
import { ConversationMembers } from './conversationMembers.entity';
import { ProviderBusiness } from './providerBuisness.entity';
import { userTypes } from 'src/enums/user.enums';
import { adminRoles } from 'src/enums/admin.enums';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: userTypes })
  userType: userTypes;

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

  @Column({ type: 'text', nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'int', default: 0 })
  step: number;

  // Admin-specific fields
  @Column({ type: 'enum', enum: adminRoles, array: true, nullable: true })
  rolesAssigned: adminRoles[];

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true, unique: true })
  employeeId: string;

  // Technician-specific
  @Column({ nullable: true })
  primaryRole: string;

  @Column({ type: 'text', array: true, nullable: true })
  secondaryRole: string[];

  @Column({ nullable: true })
  serviceLocation: string;

  @Column({ nullable: true })
  secondaryServiceLocation: string;

  // Provider-specific
  @OneToMany(() => ProviderBusiness, (provider) => provider.serviceProvider)
  providerBusinesses: ProviderBusiness[];

  @OneToOne(() => PersonalDocuments, (documents) => documents.user, { cascade: true, nullable: true })
  @JoinColumn()
  documents: PersonalDocuments;

  @OneToOne(() => TenancyContract, (contract) => contract.user, { cascade: true, nullable: true })
  @JoinColumn()
  tenancyContract: TenancyContract;

  @OneToOne(() => Vat, (vat) => vat.user, { cascade: true, nullable: true })
  @JoinColumn()
  vat: Vat;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];

  @OneToMany(() => Bookings, (booking) => booking.user, { cascade: true })
  bookings: Bookings[];

  @ManyToMany(() => ServicesMaster, (sm) => sm.userQuickAccessServices, { onDelete: 'CASCADE' })
  quickAccessServices: ServicesMaster[];

  @OneToMany(() => ConversationMembers, (conv) => conv.user, { onDelete: 'CASCADE' })
  conversations: ConversationMembers[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
