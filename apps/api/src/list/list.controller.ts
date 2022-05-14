import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListService } from './list.service';
import { Request } from 'express';
import { Public } from '../auth/public.decorator';
import { User } from '../users/entities/user.entity';
import { IGetUserAuthInfoRequest, IList } from '@wishlist-app/api-interfaces';
import { AssignedListDto } from './dto/assigned-list.dto';

@Controller('wishlists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createListDto: CreateListDto,
    @Req() request: IGetUserAuthInfoRequest
  ) {
    console.log(request.user);
    const newList: AssignedListDto = {
      name: createListDto.name,
      description: createListDto.description,
      userId: request.user.userId,
    };
    console.log(newList);

    return this.listService.create(newList);
  }
  @Post('import')
  async importFromCode(
    @Body() code: { code: string },
    @Req() request: IGetUserAuthInfoRequest
  ) {
    return this.listService.importFromCode(code.code, request.user.userId);
  }

  @Get()
  async findAll(@Req() request: IGetUserAuthInfoRequest): Promise<any[]> {
    console.log(request.user);
    return this.listService.findAll();
  }
  @Get()
  async findAllForUser(@Req() request: IGetUserAuthInfoRequest): Promise<any[]> {
    return this.listService.findAllForUser(request.user.userId);
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
