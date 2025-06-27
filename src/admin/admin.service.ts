import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userTypes } from 'src/enums/user.enums';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private adminRepository: Repository<User>,

    private jwtService: JwtService
  ) { }

  async create(createAdminDto: CreateAdminDto) {
    try {
      const createAdminObject = this.adminRepository.create(createAdminDto);
      createAdminObject.userType = userTypes.ADMIN;
      createAdminObject.password = await bcrypt.hash("admin@123", 10); // move the static pass to config/env

      const payload = { employeeId: createAdminDto.employeeId };
      const accessToken = await this.jwtService.signAsync(payload);

      const createdAdminObject = await this.adminRepository.save(createAdminObject)
      return { user: createdAdminObject , accessToken: accessToken };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(loginCredentials: { email: string, password: string }) {
    try {
      const admin = await this.adminRepository.findOne({ where: { email: loginCredentials.email , userType : userTypes.ADMIN} });
      if (!admin) {
        throw new Error("Coudn't find user assosiated with this Email");
      }

      if (!bcrypt.compareSync(loginCredentials.password, admin.password)) {
        throw new Error('Invalid Password');
      }

      const payload = { employeeId: admin.employeeId };
      const accessToken = await this.jwtService.signAsync(payload);

      return { "user": admin, "accessToken": accessToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }


}
