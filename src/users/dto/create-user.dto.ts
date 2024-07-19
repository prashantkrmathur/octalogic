import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    firstName : string;

    @IsNotEmpty()
    @IsString()
    lastName : string;

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @IsNumber()
    mobile: number;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
    
    @IsOptional()
    @IsString()
    profilePic: string

}
