import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity'; 

@Entity()
export class Bookings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bookingDate: Date;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  status: string; // e.g., 'confirmed', 'cancelled', 'pending'

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'text', nullable: true })
  @JoinColumn({ name: 'userId' })
  userId: string;
}
