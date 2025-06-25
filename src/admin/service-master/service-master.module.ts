import { Module } from '@nestjs/common';
import { ServiceMasterService } from './service-master.service';
import { ServiceMasterController } from './service-master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesMaster } from '../../entities/servicesMaster.entity';
import { Subcategories } from '../../entities/subcategories.entity';
import { ServicePackages } from '../../entities/servicePackage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesMaster , Subcategories , ServicePackages])],
  controllers: [ServiceMasterController],
  providers: [ServiceMasterService],
})
export class ServiceMasterModule {}
