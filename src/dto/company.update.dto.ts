import { IsString, MinLength } from "class-validator";

export class UpdateCompanyDto {
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