import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/user.register.dto';
import { LoginUserDto } from 'src/dto/login.user.dto';
import { RegisterCompanyDto } from 'src/dto/company.register.dto';
import { CompanyLoginDto } from 'src/dto/company.login.dto';
import { User } from 'src/models/user.model';
import { Company } from 'src/models/company.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    private generateToken(payload: Record<string, any>): string {
        return this.jwtService.sign(payload);
    }


    async registerUser(registerDto: RegisterUserDto): Promise<{ message: string, user: Partial<User> }> {
        const existingUser = await User.findOne({ where: { email: registerDto.email } })
        if (existingUser) {
            throw new UnauthorizedException(`User with email already exists!`);
        }
        const hashedPassword = await this.hashPassword(registerDto.password);
        const newUser = (await User.create({ ...registerDto, password: hashedPassword })).save();
        const { password, ...userWithoutPassword } = (await newUser).toJSON();
        return { message: `User registered successfully!`, user: userWithoutPassword }
    }

    async loginUser(loginDto: LoginUserDto): Promise<{ message: string; user: Partial<User>; token: string }> {
        const user = await User.findOne({ where: { email: loginDto.email } });
        if (!user || !(await this.validatePassword(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid email or password!');
        }

        const token = this.generateToken({ id: user.id, email: user.email });
        const { password, ...userWithoutPassword } = user.toJSON();

        return { message: 'Login successful!', user: userWithoutPassword, token };
    }

    async registerCompany(registerDto: RegisterCompanyDto): Promise<{ message: string, company: Partial<Company> }> {
        const existingCompany = await Company.findOne({ where: { email: registerDto.email } })
        if (existingCompany) {
            throw new UnauthorizedException(`Company with email already exists!`)
        }
        const hashedPassword = await this.hashPassword(registerDto.password);
        const newCompany = (await Company.create({ ...registerDto, password: hashedPassword })).save();
        const { password, ...CompanyWithoutPassword } = (await newCompany).toJSON();
        return { message: `Company registered successfully!`, company: CompanyWithoutPassword }
    }

    async loginCompany(loginDto: CompanyLoginDto): Promise<{ message: string; company: Partial<Company>; token: string }> {
        const company = await Company.findOne({ where: { email: loginDto.email } });
        if (!company || !(await this.validatePassword(loginDto.password, company.password))) {
            throw new UnauthorizedException('Invalid email or password!');
        }

        const token = this.generateToken({ id: company.id, email: company.email });
        const { password, ...companyWithoutPassword } = company.toJSON();

        return { message: 'Login successful!', company: companyWithoutPassword, token };
    }
}
