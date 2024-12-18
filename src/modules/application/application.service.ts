import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JobApplication } from 'src/models/jobApplication.model';
import { JobApplicationDto } from 'src/dto/job.application.dto';
import { JobPost } from 'src/models/jobPost.model';

@Injectable()
export class ApplicationService {
    constructor(@InjectModel(JobApplication) private readonly jobApplicationModel: typeof JobApplication,
        @InjectModel(JobPost) private readonly jobPost: typeof JobPost
    ) { }

    async applyToJob(userId: string, jobId: string, jobAppDto: JobApplicationDto): Promise<{ message: string, application: JobApplication }> {
        console.log('Service - User ID:', userId);  // Debug log
        console.log('Service - Job ID:', jobId);  // Debug log
        // Find the job using jobId
        const job = await this.jobPost.findOne({ where: { id: jobId } });
        if (!job) {
            throw new NotFoundException(`Job with ID ${jobId} not found`);
        }
        // Check if the user has already applied for the job
        const existingApplication = await JobApplication.findOne({
            where: { userId, jobId },
        });
        if (existingApplication) {
            throw new ConflictException(`You have already applied for this job!`);
        }
        // Create the application
        const { coverLetter, resume } = jobAppDto;
        const application = await JobApplication.create({
            userId,
            jobId,
            coverLetter,
            resume,
        });
        return {
            message: 'Job application submitted successfully!',
            application,
        };
    }

    async getAllJobApplication(): Promise<JobApplication[]> {
        return this.jobApplicationModel.findAll();
    }

    async updateJobApplicationStatus(applicationId: string, newStatus: string): Promise<{ message: string; application: JobApplication }> {
        // Valid statuses
        const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
        // Check if the new status is valid
        if (!validStatuses.includes(newStatus)) {
            throw new BadRequestException(`Invalid status. Allowed statuses are: ${validStatuses.join(', ')}`);
        }
        // Find the job application by ID
        const application = await this.jobApplicationModel.findByPk(applicationId);
        if (!application) {
            throw new NotFoundException(`Job application with ID ${applicationId} not found`);
        }
        // Update the status
        application.status = newStatus;
        await application.save();

        return {
            message: `Job application status updated to ${newStatus}`,
            application,
        };
    }
}
