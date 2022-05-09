import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Compressed } from 'compress-json';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListService } from './list.service';

@Controller('wishlists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }
  @Post('import')
  async importFromCode(@Body() code: { code: string }) {
    return this.listService.importFromCode(code.code);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.listService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Get('items/:id')
  async findItems(@Param('id') id: string) {
    return this.listService.findItems(+id);
  }
  @Get('export/:id')
  async getExportCode(@Param('id') id: string) {
    return this.listService.getExportCode(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
