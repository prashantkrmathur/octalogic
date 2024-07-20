import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';     
import { AuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  public async getUserProfile(@Request() req){        
     return await this.usersService.getUserProfile(req);
  }


}
