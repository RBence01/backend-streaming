import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlaylistService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }

  create(createPlaylistDto: CreatePlaylistDto) {
    return this.db.playlist.create({data: createPlaylistDto});
  }

  findAll() {
    return this.db.playlist.findMany({include: {songs: true}});
  }

  findOne(id: number) {
    return this.db.playlist.findUnique({where: {id}, include: {songs: true}});
  }

  async addSong(listid: number, id: number) {
    try {
      return this.db.playlist.update({where: {id: listid}, data: {songs: {connect: {id}}}, include: {songs: true}});   
    } catch {
      return undefined;
    }
  }

  async deleteSong(listid: number, id: number) {
    try {
      return await this.db.playlist.update({where: {id: listid}, data: {songs: {disconnect: {id}}}})
    } catch {
      return undefined;
    }
  }

  async deletePlaylist(id: number) {
    try {
      return await this.db.playlist.delete({where: {id}});
    } catch {
      return undefined;
    }
  }
}
