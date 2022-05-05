import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { IList } from '@wishlist-app/api-interfaces';

@Entity()
export class List implements IList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'Tap the edit button to add a description' })
  description: string;

  @CreateDateColumn()
  addedOn: Date;
}
