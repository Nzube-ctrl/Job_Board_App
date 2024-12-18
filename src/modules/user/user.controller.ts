import { Controller, Body, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dto/update.user.dto';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get(':id')
    async getUserProfile(@Param('id') id: string) {
        const user = await this.userService.getUserProfile(id);
        return {
            message: `User Profile`, data: user,
        }
    }

    @Put(':id')
    async updateUserProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const updatedUserProfile = await this.userService.updateUserProfile(id, updateUserDto);
        return {
            message: `User Profile updated successfully!`, data: updatedUserProfile
        }
    }

    @Delete(':id')
    async deleteUserProfile(@Param('id') id: string) {
        await this.userService.deleteUserProfile(id);
        return {
            message: `User Profile deleted!`
        }
    }
}

