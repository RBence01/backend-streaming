import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { IsNumber, Max, Min } from 'class-validator';

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;
}
