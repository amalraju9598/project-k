import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  create(createUserDto: CreateUserDto): Promise<User> {
    const role = this.userRepository.create(createUserDto);
    return this.userRepository.save(role);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id'],
      relations: [],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['first_name', 'last_name'],
      filterableColumns: {
        first_name: [FilterOperator.EQ, FilterSuffix.NOT],
      },
      where: {
        user_type: In(['client']),
      },
    });
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByParam(params: { [key: string]: any }, relations?: string[]): Promise<User | undefined> {
    // Find and return the record based on dynamic parameters
    // return this.userRepository.findOneBy(params);
    return this.userRepository.findOne({
      where: params,
      relations
    });
  }

  async findWithRelations(params: { [key: string]: any }, relations: string[]): Promise<User | undefined> {
    // Find and return the record based on dynamic parameters
    return this.userRepository.findOne({
      where: params,
      relations
    });
  }

  async addRoleToUser(user: User, role: Role): Promise<User> {
    user.roles.push(role);
    return await this.userRepository.save(user);

  }
}
