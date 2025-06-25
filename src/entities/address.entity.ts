import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { serviceRequestorRole } from 'src/enums/user.enums';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: serviceRequestorRole,
  })
  role: serviceRequestorRole;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longtitude: number;

  @Column()
  name: string;

  @Column()
  area: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  flatBuildingNumber: string;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'text', nullable: true })
  @JoinColumn({ name: 'userId' })
  userId: string;

  @Column({ default: false })
  isApproved: boolean;
}   
