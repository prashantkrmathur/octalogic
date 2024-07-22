import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class BookVehicleDto {
    
    @IsNotEmpty()
    @IsString()
    vehicleId: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    endDate: Date;

}