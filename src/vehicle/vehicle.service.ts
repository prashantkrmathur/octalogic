import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleType } from '../entities/VehicleType.entity';
import { Vehicle } from '../entities/Vehicle.entity';
import { VehicleTypeDto } from './dto/create-vehicle-type.dto';
import { Repository } from 'typeorm';
import { Booking } from '../entities/Booking.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Booking)
    private readonly bookingRepository : Repository<Booking>


  ) { }
  async createVehicletype(vehicleTypeDto: VehicleTypeDto) {
    try {
      const createVehicleType = await this.vehicleTypeRepository.save(vehicleTypeDto)
      return { statusCode: 201, data: createVehicleType }
    } catch (error) {
      console.log("error while creating vehicle type", this.createVehicletype);
      return {
        status: 400,
        message: 'Error while creating vehicle type',
        error: error.message,
      };
    }
  }

  async getAllVehicleTypes() {
    try {

      const allVehicleTypes = await this.vehicleTypeRepository.find(
        {
          relations: ['vehicle'],
        }
      );
      return { statusCode: 200, data: allVehicleTypes }
    } catch (error) {
      console.log("error while getting all vehicle types", error);
      return {
        status: 400,
        message: 'Error while getting all vehicle types',
        error: error.message,
      }

    }
  }

  async addVehicle(createVehicleDto: CreateVehicleDto) {
    try {
      const createVehicle = await this.vehicleRepository.save(createVehicleDto)
      return { statusCode: 201, data: createVehicle }

    } catch (error) {
      console.log("error while creating vehicle", error);
      return {
        status: 400,
        message: 'Error while creating vehicle',
        error: error.message,
      }

    }
  }

  async getAllVehicle() {
    try {
      const allVehicle = await this.vehicleRepository.find({
         relations: {
          vehicleType: true,
      }
     });
      return { statusCode: 200, data: allVehicle }
    } catch (error) {
      console.log("error while getting all vehicle", error);
      return {
        status: 400,
        message: 'Error while getting all vehicle',
        error: error.message,
      }
    }
  }

  async bookVehicle(){
    try {
      
      
    } catch (error) {
      
    }
  }
}
