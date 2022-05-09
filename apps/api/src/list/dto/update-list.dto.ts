import { PartialType } from '@nestjs/mapped-types';
import { List } from '../entities/list.entity';

export class UpdateListDto extends PartialType(List) {}
