import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BikeType, CarType, WHEEL } from "../../entities/VehicleType.entity";


export class VehicleTypeDto {
    @IsNotEmpty()
    @IsEnum(WHEEL)
    type : WHEEL

    @IsOptional()
    @IsEnum(CarType)
    carType ?: CarType

    @IsOptional()
    @IsEnum(BikeType)
    bikeType ?: BikeType
}