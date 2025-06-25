import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { OTP } from '../entities/otp.entity';
import { ServiceProvider } from 'src/entities/serviceProvider.entity';
import { Technicians } from 'src/entities/technicians.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OTP, ServiceProvider, Technicians])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule { }
