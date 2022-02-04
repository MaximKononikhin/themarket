import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Role} from "./role.entity";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

    async createRole(dto: CreateRoleDto) {
        const role = this.roleRepository.findOne({where: {value: dto.value}});
        if (role) {
            throw new HttpException("Такая роль уже существует", 400);
        }

        const newRole = await this.roleRepository.save(dto);
        return newRole;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: { value }});
        return role;
    }
}
