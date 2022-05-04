import { PickType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';

export class UpdateListDto extends PickType(CreateListDto, ['name'] as const) {}
