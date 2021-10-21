import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRentals1634607965204 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'car_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'expected_return_date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'late_fee',
            type: 'numeric',
            default: 0.0,
            isNullable: true,
          },
          {
            name: 'rent_amount',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'total',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKRentalCar',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKRentalUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentals');
  }
}
