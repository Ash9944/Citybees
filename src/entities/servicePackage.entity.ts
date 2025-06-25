import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Subcategories } from './subcategories.entity';

@Entity()
export class ServicePackages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  serviceLevel: string;

  @Column()
  serviceCode: string;

  @Column({ array: true, type: 'text' })
  description: string[];

  @Column()
  effectiveStartDate: string;

  @Column()
  effectiveEndDate: string;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'int' })
  resourceCount: number;

  @Column({ type: 'int' })
  estimatedTimeInMins: number;

  @Column()
  subAssetMapping: string;

  @ManyToOne(() => Subcategories, (subcategories) => subcategories.servicePackages)
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: Subcategories;

  @Column()
  subcategoryId: string;
}