import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() register: CreateUserDto) {    
    return await this.authService.registerUser(register);
  } 

  @Get('login')
  async loginUser(@Body() loginDto:LoginUserDto){
    return await this.authService.loginUser(loginDto)
  }
}
