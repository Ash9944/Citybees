import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { createAddressDto } from './dto/address.dto';
import { CreatePersonalDocumentsDto } from 'src/common/dto/personalDocuments.dto';
import { CreateVatDto } from 'src/common/dto/createVat.dto';
import { Address } from 'src/entities/address.entity';
import { PersonalDocuments } from 'src/entities/personalDocuments.entity';
import { Vat } from 'src/entities/vat.entity';
import { TenancyContract } from 'src/entities/tenancyContract.entity';
import { CreateTenancyContractDto } from './dto/createTenancyContract.dto';
import { ServicesMaster } from 'src/entities/servicesMaster.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Address)
    private addressRepository: Repository<Address>,

    @InjectRepository(PersonalDocuments)
    private personalDocumentsRepository: Repository<PersonalDocuments>,

    @InjectRepository(Vat)
    private vatRepository: Repository<Vat>,

    @InjectRepository(TenancyContract)
    private tenancyContractRepository: Repository<TenancyContract>,

    @InjectRepository(ServicesMaster)
    private servicesMasterRepository: Repository<ServicesMaster>
  ) { }

  async registerUser(userDetails: any) {
    try {
      if (!userDetails.id || !userDetails.hasOwnProperty('step')) {
        throw new Error("Mandatory Fields are missing");
      }

      let user: User | null = await this.usersRepository.findOne({
        where: { "id": userDetails.id }
      })

      if (!user) {
        throw new Error("Please register user");
      }

      switch (userDetails.step) {

        case 0:
          user.step = userDetails.step;
          await this.usersRepository.update({ "id": userDetails.id }, userDetails as CreateUserDto);
          break;

        case 1:
          user.addresses = [this.addressRepository.create(userDetails as createAddressDto)];
          user.step = userDetails.step;

          await this.usersRepository.save(user);
          break;

        case 2:
          user.documents = this.personalDocumentsRepository.create(userDetails as CreatePersonalDocumentsDto);
          user.step = userDetails.step;

          await this.usersRepository.save(user);
          break;

        case 3:
          let tenancyContract: CreateTenancyContractDto = {
            contractNumber: userDetails.contractNumber,
            contractExpiryDate: userDetails.contractExpiryDate,
            contractDocuments: userDetails.contractDocuments,
            userId: userDetails.userId
          }

          let vat: CreateVatDto = {
            isVatApplicable: userDetails.isVatApplicable,
            vatNumber: userDetails.vatNumber,
            licenseValidity: userDetails.licenseValidity,
            vatDocuments: userDetails.vatDocuments,
            userId: userDetails.userId
          }
          user.vat = this.vatRepository.create(vat);
          user.tenancyContract = this.tenancyContractRepository.create(tenancyContract);
          user.step = userDetails.step;

          await this.usersRepository.save(user);
          break;

        case 4:
          var quickAccessServices: ServicesMaster[] = await this.servicesMasterRepository.find({
            where: { id: In(userDetails.quickAccessServices) }
          });

          user.quickAccessServices = quickAccessServices;
          user.step = userDetails.step;
          await this.usersRepository.save(user);
          break;

      }

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createQuickServices(userId: string, quickServices: string[]) {
    try {
      var user = await this.usersRepository.findOne({
        where: { id: userId }
      });

      if (!user) {
        throw new Error("service requestor not found ! please register")
      }

      var servicesSelected = await this.servicesMasterRepository.find({ where: { id: In(quickServices) } });
      user.quickAccessServices = servicesSelected;

      return true;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async listQuickServices() {
    try {
      var services = await this.servicesMasterRepository.find({ select: { id: true, name: true } })
      return services;

    } catch (error) {
      throw new Error("Failed to retrive Quick services");
    }
  }

  async listAddress(userId: string) {
    try {
      var userAddress = await this.addressRepository.find({ where: { 'userId': userId } });
      return userAddress;
    } catch (error) {
      throw new Error("Failed to retrive user address");
    }
  }

  async listUserPersonalDetails(userId: string) {
    try {
      var user = await this.usersRepository.findOne({ where: { 'id': userId } });
      return user;
    } catch (error) {
      throw new Error("Failed to retrivr user personal details");
    }
  }
}
