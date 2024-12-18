import { IsString, IsEmail, MinLength, IsOptional, IsEnum, isString } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, { message: `Password must be at least 6 characters long` })
    password: string;

    @IsOptional()
    resume?: string;

    // @IsEnum(["user", "company"], { message: "Role must be either 'user' or 'company'" })
    // role: "user" | "company";

    @IsString()
    location: string;
}