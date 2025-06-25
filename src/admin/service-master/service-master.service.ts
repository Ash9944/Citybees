import { Injectable } from '@nestjs/common';
import { CreateServicesMasterDto } from './dto/create-service-master.dto';
import { UpdateServiceMasterDto } from './dto/update-service-master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesMaster } from '../../entities/servicesMaster.entity';
import { Subcategories } from '../../entities/subcategories.entity';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-service-subCatgories.dto';
import { ServicePackages } from 'src/entities/servicePackage.entity';
import { CreateServicePackageDto } from './dto/create-service-packages.entity';

@Injectable()
export class ServiceMasterService {
   constructor(
    @InjectRepository(ServicesMaster)
    private servicesRepo: Repository<ServicesMaster>,

    @InjectRepository(Subcategories)
    private subcategoriesRepo: Repository<Subcategories>,

    @InjectRepository(ServicePackages)
    private servicePackagesRepo: Repository<ServicePackages>,
  ) {}
  
  findAllServiceMaster(){
    return this.servicesRepo.find({
       relations: ['subcategories', 'subcategories.servicePackages'],
    });
  }

  createServiceMasterItem(createServicesMasterDto: CreateServicesMasterDto)  {
    const newUser = this.servicesRepo.create(createServicesMasterDto);
    return this.servicesRepo.save(newUser);
  }

  createSubAssets(createSubAssets: CreateSubcategoryDto) {
    const newSubAsset = this.subcategoriesRepo.create(createSubAssets);
    return this.subcategoriesRepo.save(newSubAsset);
  }

  createServicePackages(createServicePackageDto: CreateServicePackageDto) {
    const newServicePackage = this.servicePackagesRepo.create(createServicePackageDto);
    return this.servicePackagesRepo.save(newServicePackage);
  }

  findAll() {
    return `This action returns all serviceMaster`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceMaster`;
  }

  update(id: number, updateServiceMasterDto: UpdateServiceMasterDto) {
    return `This action updates a #${id} serviceMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceMaster`;
  }
}
