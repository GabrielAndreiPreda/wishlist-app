import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  URL: string;

  @IsNotEmpty()
  wishListID: number;
}
