import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { List } from '../../list/entities/list.entity';

@Entity()
export class ItemDto {
  wishListID: number;

  title: string;

  description: string;

  quantity: number;

  isBought: boolean;

  image: string;
}
