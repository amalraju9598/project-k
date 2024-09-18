import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { RoleSeeder } from '../roleseeder.seeder';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { SuperAdminSeeder } from '../superadminseeder.seeder';

seeder({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      Role,
    ]),
  ],
}).run([
  RoleSeeder,
  SuperAdminSeeder,
]);
