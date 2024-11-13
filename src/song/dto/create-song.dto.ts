import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  length: number;

  @IsNumber()
  price?: number;
}
