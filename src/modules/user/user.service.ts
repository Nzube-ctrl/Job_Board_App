import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UpdateUserDto } from 'src/dto/update.user.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) { }

    async getUserProfile(id: string): Promise<Partial<User>> {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found!`)
        }
        const { password, ...userWithoutPassword } = user.toJSON()
        return userWithoutPassword;
    }

    async updateUserProfile(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found!`)
        } await user.update(updateUserDto);
        const { password, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }

    async deleteUserProfile(id: string): Promise<void> {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found!`)
        }
        await user.destroy();
    }
}
