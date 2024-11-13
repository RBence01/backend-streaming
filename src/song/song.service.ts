import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  create(createSongDto: CreateSongDto) {
    return this.db.song.create({ data: createSongDto });
  }

  findAll() {
    return this.db.song.findMany();
  }

  findOne(id: number) {
    return this.db.song.findUnique({ where: { id } });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    try {
      return await this.db.song.update({ where: { id }, data: updateSongDto });
    } catch {
      return undefined;
    }
  }

  async remove(id: number) {
    try {
      return await this.db.song.delete({ where: { id } });
    } catch {
      return undefined;
    }
  }

  findTopSongs(count: number) {
    return this.db.song.findMany({ take: count, orderBy: {rating: 'desc'}});
  }

  findFreeSongs() {
    return this.db.song.findMany({ where: { price: 0 } });
  }

  async findPopularArtists() {
    const response = await this.db.song.groupBy({by: ['author'], _count: {author: true}, orderBy: {_count: {author: 'desc'}}});
    return response.map(e => ({author: e.author, numberOfSongs: e._count.author}));
  }
}
 