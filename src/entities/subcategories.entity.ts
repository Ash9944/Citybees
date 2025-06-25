import {Entity,Column,PrimaryGeneratedColumn,OneToMany,OneToOne,ManyToOne,JoinColumn} from 'typeorm';
import { ServicesMaster } from './servicesMaster.entity';
import { ServicePackages } from './servicePackage.entity';

@Entity()
export class Subcategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ array : true , type : 'text'})
  keyHighlights: string[];

  @Column()
  effectiveStartDate: string;

  @Column()
  effectiveEndDate: string;

  @ManyToOne(() => ServicesMaster,(serviceMaster) => serviceMaster.subcategories,)
  @JoinColumn({ name: 'serviceMasterId' })
  serviceMaster: ServicesMaster;

  @Column()
  serviceMasterId: string;
  
  @Column({ type: 'boolean' })
  isActive: boolean;

  @OneToMany(() => ServicePackages , servicePackages => servicePackages.subcategory , {nullable : true , onDelete : "CASCADE"})
  servicePackages : ServicePackages[]
}