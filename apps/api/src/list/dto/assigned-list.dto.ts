import { IsNotEmpty } from 'class-validator';

export class AssignedListDto {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  name: string;
  description: string;
}
