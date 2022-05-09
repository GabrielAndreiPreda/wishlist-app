import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IItem } from '@wishlist-app/api-interfaces';

@Entity()
export class Item implements IItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wishListID: number;

  @Column({ type: 'mediumtext' })
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: false })
  isBought: boolean;

  @CreateDateColumn()
  addedOn: Date;

  @Column({ type: 'text' })
  URL: string;

  @Column({ type: 'longtext' })
  image: string;
}
