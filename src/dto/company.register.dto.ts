import { IsString, IsEmail, MinLength, } from "class-validator";

export class RegisterCompanyDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, { message: `Password must be at least 6 characters long` })
    password: string;

    @IsString()
    website: string;

    @IsString()
    location: string;

    @IsString()
    description: string;

    @IsString()
    industry: string;
}