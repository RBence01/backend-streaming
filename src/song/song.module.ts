import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SongController],
  providers: [SongService, PrismaService],
})
export class SongModule {}
