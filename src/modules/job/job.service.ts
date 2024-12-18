import { BadRequestException, Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateJobDto } from 'src/dto/create.job.dto';
import { JobPost } from 'src/models/jobPost.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateJobPostDto } from 'src/dto/update.job.dto';

@Injectable()
export class JobService {
    constructor(@InjectModel(JobPost) private readonly jobPostModel: typeof JobPost) { }

    // async createJobPost(createJobDto: CreateJobDto, companyId: string) {
    //     if (createJobDto.applicationDeadline) {
    //         const currentDate = new Date();
    //         if (createJobDto.applicationDeadline < currentDate) {
    //             throw new BadRequestException(`Application deadline cannot be in the past`);
    //         }
    //     }
    //     const job = await this.jobPostModel.create({
    //         ...createJobDto,
    //         companyId,
    //     });

    //     return job;
    // }

    async createJobPost(createJobDto: CreateJobDto, companyId: string) {
        const { title, description, location } = createJobDto;
        // Check if a similar job post already exists
        const existingJob = await this.jobPostModel.findOne({
            where: {
                title,
                description,
                location,
                companyId,
            },
        });
        if (existingJob) {
            throw new ConflictException(
                `A job with the same title, description, location, and company already exists.`
            );
        }
        // Validate application deadline
        if (createJobDto.applicationDeadline) {
            const currentDate = new Date();
            if (createJobDto.applicationDeadline < currentDate) {
                throw new BadRequestException(
                    `Application deadline cannot be in the past`
                );
            }
        }
        // Create the job post
        const job = await this.jobPostModel.create({
            ...createJobDto,
            companyId,
        });
        return job;
    }

    async getAllJobPosts(): Promise<JobPost[]> {
        return this.jobPostModel.findAll();
    }

    async updateJobPost(id: string, updateJobPostDto: UpdateJobPostDto): Promise<JobPost> {
        const jobPost = await this.jobPostModel.findByPk(id);
        if (!jobPost) {
            throw new UnauthorizedException(`JobPost with ID ${id} not found!`)
        }
        if (updateJobPostDto.applicationDeadline) {
            const currentDate = new Date();
            if (new Date(updateJobPostDto.applicationDeadline) < currentDate) {
                throw new BadRequestException(`Application deadline cannot be in the past`);
            }
        }
        await jobPost.update(updateJobPostDto);
        return jobPost;
    }

    async deleteJobPost(id: string): Promise<void> {
        const jobPost = await this.jobPostModel.findByPk(id);
        if (!jobPost) {
            throw new UnauthorizedException(`JobPost with ID ${id} not found!`)
        }
        await jobPost.destroy();
    }
}
