import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class OTP {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    otpCode: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({ type: 'timestamp', nullable: true })
    expiresAt: Date;
    
    @Column({ type: 'boolean', default: false })
    isUsed: boolean;

    @Column()
    countryCode: string;
    
    @Column({ unique: true })
    phoneNumber: string;
}