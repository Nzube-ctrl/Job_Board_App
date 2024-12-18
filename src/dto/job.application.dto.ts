import { IsString, IsOptional, IsUUID, length } from "class-validator";

export class JobApplicationDto {
    @IsOptional()
    @IsString()
    coverLetter?: string;

    @IsOptional()
    @IsString()
    resume: string;

    @IsOptional() // Include only if the job ID is part of the DTO instead of route params
    @IsUUID()
    jobId?: string;
}