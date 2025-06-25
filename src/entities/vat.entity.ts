import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ServiceProvider } from './serviceProvider.entity';
import { join } from 'path';
import { ProviderBusiness } from './providerBuisness.entity';

@Entity()
export class Vat {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'boolean', nullable: true })
  isVatApplicable : boolean

  @Column({ type: 'text', nullable: true })
  vatNumber: string;

  @Column({ type: 'text', nullable: true })
  licenseValidity: string;

  @Column({ type: 'text', nullable: true })
  vatDocuments: string[];

  @OneToOne(() => User, (user) => user.vat, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'text', nullable: true })
  userId: string;

  @OneToOne(() => ProviderBusiness, (serviceProvider) => serviceProvider.vat, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'providerBusinessId' })
  serviceProvider: ProviderBusiness;

  @Column({ type: 'text', nullable: true })
  providerBusinessId: string;
}