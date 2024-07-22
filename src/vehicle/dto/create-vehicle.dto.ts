import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    make : string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    imageUrl ?: string

    @IsNotEmpty()
    @IsString()
    model: string

    @IsNotEmpty()
    @IsNumber()
    year: number

    @IsNotEmpty()
    @IsString()
    category: string

    @IsNotEmpty()
    @IsNumber()
    pricePerDay : number

    @IsNotEmpty()
    @IsUUID()
    vehicleTypeId : string

    @IsOptional()
    @IsBoolean()
    isBooked ?: boolean

}
