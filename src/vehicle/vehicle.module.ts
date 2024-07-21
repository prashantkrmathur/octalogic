import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from '../entities/VehicleType.entity';
import { Vehicle } from '../entities/Vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType, Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
