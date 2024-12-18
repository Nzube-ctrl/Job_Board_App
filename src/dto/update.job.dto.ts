import { IsString, MinLength, IsOptional, IsDate, IsEnum } from "class-validator";

export class UpdateJobPostDto {
    @IsString()
    title: string;

    @IsString()
    @MinLength(10, { message: `Description must be at least 10 characters long` })
    description: string;

    @IsString()
    location: string;

    @IsString()
    @IsOptional()
    salaryRange?: string;

    @IsDate()
    @IsOptional()
    applicationDeadline?: Date;

    @IsEnum(["full-time", "part-time", "contract", "freelance", "internship"], {
        message: "Job type must be one of: full-time, part-time, contract, freelance, internship",
    })
    jobType: "full-time" | "part-time" | "contract" | "freelance" | "internship";
}