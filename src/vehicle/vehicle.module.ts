import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from '../entities/VehicleType.entity';
import { Vehicle } from '../entities/Vehicle.entity';
import { Booking } from '../entities/Booking.entity';
import { UserEntity } from '../entities/User.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType, Vehicle, Booking, UserEntity])],
  controllers: [VehicleController],
  providers: [VehicleService, JwtService],
})
export class VehicleModule {}
