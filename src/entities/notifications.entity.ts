// notification.entity.ts
import { userTypes } from 'src/enums/user.enums';
import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, ManyToOne} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  message: string;

 @Column({
    type: 'enum',
    enum: userTypes,
  })
  recipientType: userTypes;

  @Column('uuid')
  recipientId: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
