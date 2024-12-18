import { Module } from '@nestjs/common';
import { Company } from 'src/models/company.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
    imports: [SequelizeModule.forFeature([Company])],
    controllers: [CompanyController],
    providers: [CompanyService]
})
export class CompanyModule { }
