import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateCompanyDto } from 'src/dto/company.update.dto';
import { Company } from 'src/models/company.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company) private readonly companyModel: typeof Company) { }

    async getCompanyProfile(id: string): Promise<Partial<Company>> {
        const company = await this.companyModel.findByPk(id);
        if (!company) {
            throw new UnauthorizedException(`Company with ID ${id} not found`)
        }
        const { password, ...companyWithoutPassword } = company.toJSON();
        return companyWithoutPassword;
    }

    async updateCompanyProfile(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Partial<Company>> {
        const company = await this.companyModel.findByPk(id);
        if (!company) {
            throw new UnauthorizedException(`Company with ID ${id} not found`)
        } await company.update(updateCompanyDto);
        const { password, ...companyWithoutPassword } = company.toJSON();
        return companyWithoutPassword;
    }

    async deleteCompanyProfile(id: string): Promise<void> {
        const company = await this.companyModel.findByPk(id);
        if (!company) {
            throw new UnauthorizedException(`Company with ID ${id} not found`)
        } await company.destroy();
    }
}
