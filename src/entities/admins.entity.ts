import { adminRoles } from "src/enums/admin.enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admins {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: adminRoles,
    })
    rolesAssigned: adminRoles[];

    @Column()
    countryCode: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column({ unique: true })
    email: string;

    @Column()
    designation: string;

    @Column()
    department: string;

    @Column({ unique: true })
    employeeId: string;
}