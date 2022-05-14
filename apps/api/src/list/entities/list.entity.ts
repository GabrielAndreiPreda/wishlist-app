import { IList } from '@wishlist-app/api-interfaces';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List implements IList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column({ default: 'Click the edit button to add a description' })
  description: string;

  @CreateDateColumn()
  addedOn: Date;
}
