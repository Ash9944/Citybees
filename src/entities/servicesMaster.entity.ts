import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Subcategories } from './subcategories.entity';
import { User } from './user.entity';
import { ProviderBusiness } from './providerBuisness.entity';

@Entity()
export class ServicesMaster {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({type: 'text', array: true , nullable: true})
    heroImages: string[];

    @Column({ type: 'text' })
    serviceCategoryIcons: string[];

    @Column()
    effectiveStartDate : string;

    @Column()
    effectiveEndDate : string;

    @Column({type : 'boolean'})
    isActive : boolean;

    @Column({type : 'boolean'})
    isGeneralInspectionAsOption : boolean;

    @OneToMany(() => Subcategories , (subcategories) => subcategories.serviceMaster , {nullable : true , onDelete : "CASCADE"})
    subcategories : Subcategories[];

    @ManyToMany(() => User , user => user.quickAccessServices , {onDelete : "CASCADE"})
    @JoinTable()
    userQuickAccessServices : User[];

    @ManyToMany(() => ProviderBusiness , user => user.serviceCategory , {onDelete : "CASCADE"})
    providerBuissnessServiceCategories : ProviderBusiness[];
}