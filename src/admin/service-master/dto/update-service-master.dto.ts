import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesMasterDto } from './create-service-master.dto';

export class UpdateServiceMasterDto extends PartialType(CreateServicesMasterDto) {}
