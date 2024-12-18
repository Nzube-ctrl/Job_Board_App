import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobPost } from 'src/models/jobPost.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([JobPost])],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule { }
