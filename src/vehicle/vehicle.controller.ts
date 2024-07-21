import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleTypeDto } from './dto/create-vehicle-type.dto';

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

  @Get('all')
  async getAllVehicle(){
    return await this.vehicleService.getAllVehicle();
  } 

  @Post('bookVehicle') 
  async bookVehicle() {
    return await this.vehicleService.bookVehicle();
  }

}
