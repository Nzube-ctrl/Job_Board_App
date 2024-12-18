import { Controller, Post, Body, UseGuards, Req, Get, Put, Param, Delete } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from 'src/dto/create.job.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { UpdateJobPostDto } from 'src/dto/update.job.dto';


@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Post('')
    async createJobPost(@Body() createJobDto: CreateJobDto, @Req() request: any) {
        const id = request.user.id;
        const createdJobPost = await this.jobService.createJobPost(createJobDto, id);
        return {
            message: `Job Post Created!`,
            data: createdJobPost,
        }
        // return this.jobService.createJobPost(createJobDto, id)
    }

    @Get('')
    async getAllJobPosts() {
        const jobPosts = await this.jobService.getAllJobPosts();
        return {
            message: `All Job Postings available!`,
            data: jobPosts
        }
    }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Put(':id')
    async updateJobPost(@Param('id') id: string, @Body() updateJobPostDto: UpdateJobPostDto) {
        const updatedJobPost = await this.jobService.updateJobPost(id, updateJobPostDto);
        return {
            message: `JobPost Updated successfully!`,
            data: updatedJobPost
        }
    }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Delete(':id')
    async deleteJobPost(@Param('id') id: string) {
        await this.jobService.deleteJobPost(id);
        return {
            message: `JobPost deleted!`
        }
    }
}
