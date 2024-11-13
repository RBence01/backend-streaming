import { Controller, Get, Post, Body, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { response } from 'express';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @HttpCode(204)
  @Delete(':id')
  async deletePlaylist(@Param('id') id: string) {
    const response = await this.playlistService.deletePlaylist(+id);
    if (!response) throw new NotFoundException();
  }

  @Post(':listid/:id')
  async addSong(@Param('listid') listid: string, @Param('id') songid) {
    const reponse = await this.playlistService.addSong(+listid, +songid);
    if (!response) throw new NotFoundException();
    return reponse;
  }

  @HttpCode(204)
  @Delete(':listid/:id')
  async deleteSong(@Param('listid') listid: string, @Param('id') songid) {
    const response = await this.playlistService.deleteSong(+listid, +songid);
    if (!response) throw new NotFoundException();
  }
}
