import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @HttpCode(200)
  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @HttpCode(200)
  @Get('top')
  findTopSongs(@Query('count') count: string = "10") {
    return this.songService.findTopSongs(+count);
  }

  @HttpCode(200)
  @Get('free')
  findFreeSongs() {
    return this.songService.findFreeSongs();
  }

  @HttpCode(200)
  @Get('popularArtists')
  findPopularArtists() {
    return this.songService.findPopularArtists();
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const song = await this.songService.findOne(+id);
    if (!song) throw new NotFoundException("No song found with id: " + id);
    return song;
  }

  @HttpCode(201)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    const song = await this.songService.update(+id, updateSongDto);
    if (!song) throw new NotFoundException("No song found with id: " + id);
    return song;
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const success =  this.songService.remove(+id);
    if (!success) throw new NotFoundException("No song found with id: " + id);
  }
}
