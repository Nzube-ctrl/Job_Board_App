import { IsString, IsEmail, MinLength } from "class-validator";

export class CompanyLoginDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}