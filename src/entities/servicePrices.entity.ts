import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { ProviderBusiness } from './providerBuisness.entity';
import { ServicePackages } from './servicePackage.entity';

@Entity()
export class ServicePrices {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ServicePackages)
    package: ServicePackages;

    @Column()
    @JoinColumn({name : "packageId"})
    pacakgeId : string

    @ManyToOne(() => ProviderBusiness, pb => pb.prices, { onDelete: 'CASCADE' })
    @JoinColumn({name : "providerId"})
    provider: ProviderBusiness;

    @Column()
    providerId : string;

    @Column('decimal')
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

}