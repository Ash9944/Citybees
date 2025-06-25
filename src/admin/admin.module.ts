import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ServiceMasterModule } from './service-master/service-master.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from 'src/entities/admins.entity';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [ServiceMasterModule ,TypeOrmModule.forFeature([Admins])],
})
export class AdminModule {}
