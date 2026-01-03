import { User } from 'src/users/user.entity';
import {
  AfterInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: string;

  @Column()
  lat: string;

  @Column()
  milage: string;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @AfterInsert()
  logInsert() {
    console.log('New Report Inserted');
  }
}
