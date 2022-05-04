import { IsNotEmpty } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateListDto {
  @IsNotEmpty()
  name: string;
}
