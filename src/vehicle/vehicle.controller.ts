import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleTypeDto } from './dto/create-vehicle-type.dto';
import { BookVehicleDto } from './dto/book-vehicle.dto';
import { AuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('createVehicleType')
  async createVehicletype(@Body() createVehicleDto : VehicleTypeDto){
    return await this.vehicleService.createVehicletype(createVehicleDto);
  }

  @Get('vehicleTypes')
  async getAllVehicleTypes(){
    return await this.vehicleService.getAllVehicleTypes();
  }

  @Post('addVehicle')
  async addVehicle(@Body() createVehicleDto : CreateVehicleDto){
    return await this.vehicleService.addVehicle(createVehicleDto);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllVehicle(){
    return await this.vehicleService.getAllVehicle();
  } 

  @Post('booking') 
  async bookVehicle(@Body() bookVehicleDto: BookVehicleDto) {
    return await this.vehicleService.bookVehicle(bookVehicleDto);
  }

}
