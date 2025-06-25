import { Entity, Column, PrimaryGeneratedColumn,ManyToOne,JoinColumn, OneToMany, OneToOne, ManyToMany } from 'typeorm';
import { Vat } from './vat.entity';
import { ServiceProvider } from './serviceProvider.entity';
import { Technicians } from './technicians.entity';
import { ServicesMaster } from './servicesMaster.entity';
import { ServicePrices } from './servicePrices.entity';

@Entity()
export class ProviderBusiness {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  businessName: string;

  @ManyToMany(() => ServicesMaster, (serviceMaster) => serviceMaster.providerBuissnessServiceCategories, {
    cascade : true,
  })
  serviceCategory: ServicesMaster[];

  @Column({ type: 'int' })
  tradeBuisinessId: number;

  @Column()
  licenseDatefrom: string;

  @Column()
  licenseDateto: string;

  @Column({array: true, type: 'text'})
  uploadedDocuments: string[];

  @OneToOne(() => Vat, (vat) => vat.providerBusinessId, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  vat: Vat;

  @Column({array: true, type: 'text'})
  serviceLocations: string[];

  @Column({ type: 'text' })
  streetAddress: string;

  @Column()
  postalCode: string;

  @Column({ type: 'int' })
  serviceRadiusInKm: number;

  @ManyToOne(() => ServiceProvider, (vat) => vat.providerBusinesses, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'serviceProviderId' })
  serviceProvider: ServiceProvider;

  @Column({ type: 'text' })
  serviceProviderId: string;

  @OneToMany(() => Technicians, (technician) => technician.buisness, {
    onDelete: 'SET NULL',
  })
  technicians: Technicians[];

  @Column('double precision')
  latitude : number;

  @Column('double precision')
  longtitude : number;

  @OneToMany(() => ServicePrices , sp => sp.provider)
  prices : ServicePrices[]
}
