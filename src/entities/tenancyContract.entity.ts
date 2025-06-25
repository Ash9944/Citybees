import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class TenancyContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  contractNumber: string;

  @Column({ type: 'text', nullable: true })
  contractExpiryDate: string;

  @Column({ type: 'text', nullable: true })
  contractDocuments: string[];

  @OneToOne(() => User, (user) => user.tenancyContract)
  user: User;

  @Column({ type: 'text', nullable: true })
  userId: string;
}