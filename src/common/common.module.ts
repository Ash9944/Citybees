import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { OTP } from '../entities/otp.entity';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';
@Module({
  imports: [TypeOrmModule.forFeature([User, OTP ]) , RedisCacheModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule { }
