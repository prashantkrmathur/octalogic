import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config,service';

@Module({
  imports: [UsersModule, VehicleModule,TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
