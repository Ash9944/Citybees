import { Body, Controller, Post } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) { }

  @Post('otp/login')
  login(@Body() loginCredentials: { countryCode: string, phoneNumber: string }) {
    return this.commonService.otpLogin(loginCredentials);       
  }

  @Post('otp/verify/requester')
  verifyRequesterOtp(@Body() otpCredentials: { phoneNumber: string; otp: string }) {
    return this.commonService.verifyUserOtp(otpCredentials, "REQUESTER");
  }

  @Post('otp/verify/provider')
  verifyProviderOtp(@Body() otpCredentials: { phoneNumber: string; otp: string }) {
    return this.commonService.verifyUserOtp(otpCredentials, "PROVIDER");
  }

  @Post('otp/verify/technician')
  verifyTechnicianOtp(@Body() otpCredentials: { phoneNumber: string; otp: string }) {
    return this.commonService.verifyUserOtp(otpCredentials, "TECHNICIAN");
  }

}
