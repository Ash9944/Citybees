import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceMasterService } from './service-master.service';
import { CreateServicesMasterDto } from './dto/create-service-master.dto';
import { UpdateServiceMasterDto } from './dto/update-service-master.dto';
import { CreateSubcategoryDto } from './dto/create-service-subCatgories.dto';
import { CreateServicePackageDto } from './dto/create-service-packages.entity';

@Controller('service-master')
export class ServiceMasterController {
  constructor(private readonly serviceMasterService: ServiceMasterService) {}
  @Get()
  getAllServiceMaster(){
    return this.serviceMasterService.findAllServiceMaster();
  }

  @Post()
  createServiceMaster(@Body() createServiceMasterDto: CreateServicesMasterDto) {
    return this.serviceMasterService.createServiceMasterItem(createServiceMasterDto);
  }

  @Post('sub-assests')
  createSubAssets(@Param('masterId') masterId: string ,@Body() createSubAssets: CreateSubcategoryDto) {
    return this.serviceMasterService.createSubAssets(createSubAssets);
  }

  @Post("service-packages")
  createServicePackages(@Body() createServicePackageDto: CreateServicePackageDto) {
    return this.serviceMasterService.createServicePackages(createServicePackageDto);
  }

  @Get()
  findAll() {
    return this.serviceMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceMasterDto: UpdateServiceMasterDto) {
    return this.serviceMasterService.update(+id, updateServiceMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceMasterService.remove(+id);
  }
}
