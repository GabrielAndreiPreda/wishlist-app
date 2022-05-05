import { PartialType, PickType } from '@nestjs/mapped-types';
import { List } from '../entities/list.entity';
import { CreateListDto } from './create-list.dto';

export class UpdateListDto extends PartialType(List) {}
