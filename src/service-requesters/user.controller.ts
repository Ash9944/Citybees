import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('service/requester')
export class UserController {
  constructor(private readonly userService: UsersService) { }

  @UseGuards(AuthGuard)
  @Post('register')
  registerUser(@Body() userDetails: any) {
    return this.userService.registerUser(userDetails)
  }

  @UseGuards(AuthGuard)
  @Get("list/quick/services")
  listQuickServices(){
    return this.userService.listQuickServices();
  }

  @UseGuards(AuthGuard)
  @Get("list/addresses/:userId")
  listUserAddress(@Param() idDetails : { userId : string} ){
    return this.userService.listAddress(idDetails.userId);
  }

  @UseGuards(AuthGuard)
  @Get("list/personal/:userId")
  listUserPersonalDetails(@Param() idDetails : { userId : string}){
    return this.userService.listUserPersonalDetails(idDetails.userId);
  }

}
