import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {RegisterUserDto} from "../auth/dto/register-user.dto";
import {RoleService} from "../role/role.service";
import {FileService} from "../file/file.service";
import {NotFoundException} from "../exceptions/not-found.exception";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
            private userRepository: Repository<User>,
        private roleService: RoleService,
        private fileService: FileService,
    ) {
    }

    async createUser(dto: RegisterUserDto) {
        const role = await this.roleService.getRoleByValue("USER");
        const user = await this.userRepository.save({...dto, roles: [role]});
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}});
        return user;
    }


    async getUserById(id: number) {
        const user = await this.userRepository.findOne({where: {id}});
        return user;
    }

    async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
        const user = await this.getUserById(userId);
        if (user.avatar) {
            await this.deleteAvatar(userId);
        }
        const avatar = await this.fileService.uploadFile(imageBuffer, filename);
        await this.userRepository.update(userId, {
            avatar
        });
        return avatar;
    }

    async deleteAvatar(userId: number) {
        const user = await this.getUserById(userId);

        if (!user.avatar) {
            throw new NotFoundException("У пользователя нет аватара");
        }
        await this.fileService.deleteFile(user.avatar.id);
    }
}
