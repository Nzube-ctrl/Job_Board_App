import { IsString, IsEmail, IsOptional, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(6, { message: `Password must be at least 6 characters long` })
    password: string;

    @IsString()
    location: string;

    @IsOptional()
    resume?: string;
}