import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/login.user.dto';
import { RegisterUserDto } from 'src/dto/user.register.dto';
import { CompanyLoginDto } from 'src/dto/company.login.dto';
import { RegisterCompanyDto } from 'src/dto/company.register.dto';
import { User } from 'src/models/user.model';
import { Company } from 'src/models/company.model';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register-user')
    async register(@Body() registerDto: RegisterUserDto): Promise<{ message: string; user: Partial<User> }> {
        return this.authService.registerUser(registerDto);
    }

    @Post('login-user')
    async login(@Body() loginDto: LoginUserDto): Promise<{ message: string; user: Partial<User> }> {
        return this.authService.loginUser(loginDto);
    }

    @Post('register-company')
    async registerCompany(@Body() registerDto: RegisterCompanyDto): Promise<{ message: string, company: Partial<Company> }> {
        return this.authService.registerCompany(registerDto);
    }

    @Post('login-company')
    async loginCompany(@Body() loginDto: CompanyLoginDto): Promise<{ message: string, company: Partial<Company> }> {
        return this.authService.loginCompany(loginDto);
    }
}
