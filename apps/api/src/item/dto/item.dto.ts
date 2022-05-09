import { Entity } from 'typeorm';

@Entity()
export class ItemDto {
  wishListID: number;

  title: string;

  description: string;

  quantity: number;

  isBought: boolean;

  URL: string;

  image: string;
}
