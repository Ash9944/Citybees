import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ServiceMasterModule } from './service-master/service-master.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [ServiceMasterModule ,TypeOrmModule.forFeature([User])],
})
export class AdminModule {}
