import { PartialType } from '@nestjs/mapped-types';
import { Min } from 'class-validator';
import { ItemDto } from './item.dto';

export class UpdateItemDto extends PartialType(ItemDto) {
  @Min(1)
  declare quantity?: number;
}
