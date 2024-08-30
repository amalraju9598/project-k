import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  async createOrUpdate(createOrUpdateRoleDto: CreateRoleDto): Promise<Role> {
    const { name, ...updateData } = createOrUpdateRoleDto;

    // Check if a role with the given name already exists
    let role = await this.roleRepository.findOneBy({ name });

    if (role) {
      // If it exists, update it
      await this.roleRepository.update(role.id, updateData);
      role = { ...role, ...updateData };
    } else {
      // If it doesn't exist, create a new role
      role = this.roleRepository.create(createOrUpdateRoleDto);
      await this.roleRepository.save(role);
    }

    return role;
  }
  async findOneByName(name: string): Promise<Role> {
    return this.roleRepository.findOneBy({ name });
  }
}
