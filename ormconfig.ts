const ConnectionOptions = require('typeorm');
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configSerive = new ConfigService();

export default new ConnectionOptions.DataSource({
  type: 'mysql',
  host: configSerive.get('DB_HOST'),
  port: configSerive.get('DB_PORT'),
  username: configSerive.get('DB_USER'),
  password: configSerive.get('DB_PASSWORD'),
  database: configSerive.get('DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // migrationsRun: false,
  // logging: false,
  // logger: 'file',

  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  migrationsTableName: 'migrations',
});
