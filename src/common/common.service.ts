import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OTP } from 'src/entities/otp.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userTypes } from '../enums/user.enums';

@Injectable()
export class CommonService {
    constructor(
        @InjectRepository(User)
        private requesterRepositor: Repository<User>,

        @InjectRepository(OTP)
        private otpRepository: Repository<OTP>,

        private jwtService: JwtService
    ) { }

    async otpLogin(loginCredentials: { countryCode: string, phoneNumber: string }) {
        try {
            const otpObject = await this.otpRepository.findOne({
                where: {
                    phoneNumber: loginCredentials.phoneNumber
                }
            })

            if (otpObject && otpObject.expiresAt > new Date()) {
                return true;
            }

            if (otpObject && otpObject.expiresAt < new Date()) {
                this.otpRepository.remove(otpObject);
            }

            const otp = randomInt(100000, 1000000);
            // logic to send OTP to the user's phone number would go here
            //
            //

            const newOTP = this.otpRepository.create({
                countryCode: loginCredentials.countryCode,
                phoneNumber: loginCredentials.phoneNumber,
                otpCode: await bcrypt.hash(otp.toString(), 10),
                expiresAt: new Date(Date.now() + 5 * 60 * 1000), // OTP valid for 5 minutes
            })
            await this.otpRepository.save(newOTP);

            return otp // for dev env;
        } catch (error) {
            return false;
        }
    }

    async verifyUserOtp(otpCredentials: { phoneNumber: string; otp: string }, userType: userTypes) {
        try {
            const otpObject = await this.otpRepository.findOne({
                where: {
                    phoneNumber: otpCredentials.phoneNumber
                }
            })
            if (!otpObject) {
                throw new Error('OTP not found');
            }

            if (Date.now() > otpObject.expiresAt.getTime()) {
                await this.otpRepository.remove(otpObject);
                throw new Error('OTP has expired , Please request a new OTP');
            }

            if (!bcrypt.compareSync(otpCredentials.otp, otpObject.otpCode)) {
                throw new Error('Invalid OTP');
            }

            let user = await this.requesterRepositor.findOne({
                where: { phoneNumber: otpCredentials.phoneNumber, userType: userType },
            });

            if (!user) {
                var createdUser = this.requesterRepositor.create({
                    countryCode: otpObject.countryCode,
                    phoneNumber: otpCredentials.phoneNumber,
                    userType: userType
                });

                user = await this.requesterRepositor.save(createdUser);

            }


            const payload = { userId: user ? user.id : null };
            const accessToken = await this.jwtService.signAsync(payload);
            await this.otpRepository.remove(otpObject);

            return {
                isUserRegistered: user ? true : false,
                user: user ? user : {},
                userId: user ? user.id : null,
                accessToken: user ? accessToken : null,
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
