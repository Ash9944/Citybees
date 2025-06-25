import {Entity,Column,PrimaryGeneratedColumn, JoinColumn,OneToOne } from 'typeorm';
import { User } from './user.entity';
import { ServiceProvider } from './serviceProvider.entity';
import { Technicians } from './technicians.entity';

@Entity()
export class PersonalDocuments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  idNumber: string;

  @Column()
  expiryDate: string;

  @Column({ array : true, type: 'text'})
  uploadedDocuments: string[];

  @OneToOne(() => User, (user) => user.documents, {nullable: true, onDelete: 'SET NULL'})
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'text', nullable: true })
  userId: string;

  @OneToOne(() => ServiceProvider, (user) => user.documents, {nullable: true, onDelete: 'SET NULL'})
  @JoinColumn({ name: 'serviceProviderId' })
  serviceProvider: ServiceProvider;

  @Column({ type: 'text', nullable: true })
  serviceProviderId: string;

  @OneToOne(() => Technicians, (user) => user.documents, {nullable: true, onDelete: 'SET NULL'})
  @JoinColumn({ name: 'technicianId' })
  technician: Technicians;

  @Column({ type: 'text', nullable: true })
  technicianId: string;
}
