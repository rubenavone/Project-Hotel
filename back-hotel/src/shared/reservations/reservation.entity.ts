import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Category } from '../categories/category.entity';

export class ReservationCustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adress: {
    street: string;
    zipcode: string;
    city: string;
    country: string;
  };
}

export class ReservationData {
  customer: ReservationCustomerData;
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(joinWith => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string; //'2020-06-24'

  @Column({ name: 'end_date', type: 'date' })
  endDate: string; //'2020-06-24'

  @Column({ type: 'jsonb' })
  data: ReservationData;
}
