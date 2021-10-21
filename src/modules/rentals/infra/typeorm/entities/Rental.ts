import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column({ precision: 10, scale: 2 })
  late_fee: number;

  @Column({ precision: 10, scale: 2 })
  rent_amount: number;

  @Column({ precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
