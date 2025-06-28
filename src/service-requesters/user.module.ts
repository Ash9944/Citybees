import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { PersonalDocuments } from '../entities/personalDocuments.entity';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { Vat } from 'src/entities/vat.entity';
import { ServicesMaster } from 'src/entities/servicesMaster.entity';
import { TenancyContract } from 'src/entities/tenancyContract.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
@Module({
  imports: [TypeOrmModule.forFeature([User, Address, PersonalDocuments, Vat , TenancyContract ,ServicesMaster]) , RedisCacheModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
