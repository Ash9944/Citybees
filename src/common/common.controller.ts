import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommonService } from './common.service';
import { userTypes } from 'src/enums/user.enums';

@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) { }

  @Post('otp/login')
  login(@Body() loginCredentials: { countryCode: string, phoneNumber: string }) {
    return this.commonService.otpLogin(loginCredentials);       
  }

  @Post('otp/verify/requester')
  verifyRequesterOtp(@Body() otpCredentials: { phoneNumber: string; otp: string }) {
    return this.commonService.verifyUserOtp(otpCredentials, userTypes.SERVICE_REQUESTER);
  }

  @Post('otp/verify/provider')
  verifyProviderOtp(@Body() otpCredentials: { phoneNumber: string; otp: string }) {
    return this.commonService.verifyUserOtp(otpCredentials, userTypes.SERVICE_PROVIDER);
  }

  @Post('otp/verify/technician')
  verifyTechnicianOtp(@Body() otpCredentials: { phoneNumber: string; otp: string }) {
    return this.commonService.verifyUserOtp(otpCredentials, userTypes.TECHNICIAN);
  }

  @Post('/logout/:id')
  logoutUser (@Param() id : string ){
    return this.commonService.logout(id);
  }

}
