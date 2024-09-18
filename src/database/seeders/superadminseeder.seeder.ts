
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuperAdminSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) { }

  async seed(): Promise<any> {
    // Generate and insert user data
    const roleName = 'superAdmin';
    const superAdminRole = await this.userRepository.findOneBy({ user_type: roleName });
    const adminRole = await this.roleRepository.findOneBy({ name: roleName });

    if (!superAdminRole && adminRole) {
      const superAdmin = this.userRepository.create({
        first_name: 'Super',
        last_name: 'Admin',
        user_type: roleName,
        email: 'superadmin@example.com',
        phone: '1234567890',
        password: 'securepassword',
        is_active: true,
      });

      //assigning all roles to superadmin
      superAdmin.roles = [adminRole];

      return this.userRepository.save(superAdmin);
    }
  }

  async drop(): Promise<any> {
    // Drop user data
  }
}