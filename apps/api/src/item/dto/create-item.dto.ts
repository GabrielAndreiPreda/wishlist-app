import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  wishListID: number;
}
