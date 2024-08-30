import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserRolesTable1725028181742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role_user',
        columns: [
          {
            name: 'role_id',
            type: 'varchar',
            scale: 36,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'varchar',
            scale: 36,
            generationStrategy: 'uuid',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role_user');
  }
}
