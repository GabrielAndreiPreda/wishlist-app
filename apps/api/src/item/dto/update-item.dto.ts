import { PartialType, PickType } from '@nestjs/mapped-types';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from './create-item.dto';
import { ItemDto } from './item.dto';

export class UpdateItemDto extends PickType(ItemDto, [
  'wishListID',
  'quantity',
  'isBought',
] as const) {}
