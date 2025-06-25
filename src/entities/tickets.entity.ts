import { CONFIGURABLE_MODULE_ID } from "@nestjs/common/module-utils/constants";
import { ticketStatus } from "src/enums/admin.enums";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Admins } from "./admins.entity";

@Entity()
export class Tickets {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ticketStatus,
        default: ticketStatus.OPEN
    })
    status: ticketStatus;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn()
    senderId: string;

    @ManyToOne(() => Admins, { nullable: true })
    @JoinColumn()
    assignedToId: string;

    @Column()
    assignedById: string;

    @CreateDateColumn()
    createdAt: Date;
}