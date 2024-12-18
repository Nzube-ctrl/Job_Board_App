import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { JobApplication } from 'src/models/jobApplication.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobPost } from 'src/models/jobPost.model';

@Module({
  imports: [SequelizeModule.forFeature([JobApplication, JobPost])],
  controllers: [ApplicationController],
  providers: [ApplicationService]
})
export class ApplicationModule { }
