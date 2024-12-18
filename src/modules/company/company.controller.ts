import { Controller, Body, Put, Delete, Get, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from 'src/dto/company.update.dto';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Get(':id')
    async getCompanyProfile(@Param('id') id: string) {
        const company = await this.companyService.getCompanyProfile(id);
        return {
            message: `Company Profile`,
            data: company
        }
    }

    @Put(':id')
    async updateCompanyProfile(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        const updatedCompanyProfile = await this.companyService.updateCompanyProfile(id, updateCompanyDto);
        return {
            message: `Company profile updated successfully!`,
            data: updatedCompanyProfile,
        }
    }

    @Delete(':id')
    async deleteCompanyProfile(@Param('id') id: string) {
        await this.companyService.deleteCompanyProfile(id);
        return {
            message: `Company profile deleted`
        }
    }
}
