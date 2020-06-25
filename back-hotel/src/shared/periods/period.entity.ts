import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/shared/categories/category.entity';

export class PeriodData {
  prices: number[]; //Du dimanche au samedi
}

@Entity()
export class Period {
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
  data: PeriodData;
}
