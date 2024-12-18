import { Controller, Param, Post, UseGuards, Request, Body, ValidationPipe, Get, Patch } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { JobApplicationDto } from 'src/dto/job.application.dto';
import { JobApplication } from 'src/models/jobApplication.model';
import { AuthorizationGuard } from 'src/guards/authorization.guard';


@UseGuards(AuthenticationGuard)
@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) { }

    @Post(':jobId')
    async applyToJob(
        @Param('jobId') jobId: string,  // jobId from the route parameter
        @Request() req,  // userId from the authenticated request
        @Body(ValidationPipe) jobDto: JobApplicationDto
    ): Promise<{ message: string, application: JobApplication }> {
        const userId = req.user.id;  // userId from the authenticated user
        console.log('Controller - Job ID:', jobId);  // Debug log
        console.log('Controller - User ID:', userId);  // Debug log
        // Pass the correct parameters to the service
        return this.applicationService.applyToJob(userId, jobId, jobDto);  // Notice the order change
    }

    @Get('')
    async getAllJobApplication() {
        const jobApplications = await this.applicationService.getAllJobApplication();
        return {
            message: `All job applications available`,
            data: jobApplications
        }
    }

    @UseGuards(AuthorizationGuard)
    @Patch(':applicationId/status')
    async updateApplicationStatus(@Param('applicationId') applicationId: string, @Body('status') status: string) {
        return this.applicationService.updateJobApplicationStatus(applicationId, status);
    }
}
