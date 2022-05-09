import { IItem } from '@wishlist-app/api-interfaces';
import { Entity } from 'typeorm';

@Entity()
export class ItemDto implements Omit<IItem, 'id' | 'addedOn'> {
  wishListID: number;

  title: string;

  description: string;

  quantity: number;

  isBought: boolean;

  url: string;

  image: string;
}
