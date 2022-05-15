import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PickType } from '@nestjs/mapped-types';
import { InjectRepository } from '@nestjs/typeorm';
import { IList, IListExport } from '@wishlist-app/api-interfaces';
import { OrbitEncoder } from 'orbit-encoder';
import { listenerCount } from 'process';
import { Repository } from 'typeorm';
import { Item } from '../item/entities/item.entity';
import { ItemService } from '../item/item.service';
import { AssignedListDto } from './dto/assigned-list.dto';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,

    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private itemService: ItemService
  ) {}
  create(assignedListDto: AssignedListDto) {
    return this.listRepository.save(assignedListDto);
  }

  async findAll() {
    return this.listRepository.find({
      order: {
        addedOn: 'DESC',
      },
    });
  }
  async findAllForUser(id: number) {
    return this.listRepository.find({
      where: {
        userId: id,
      },
      order: {
        addedOn: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return await this.listRepository.findOne(id);
  }

  async getExportCode(id: number) {
    return JSON.stringify(this.compress(await this.getListExport(id)));
  }
  private async getListExport(id: number) {
    const listExport: IListExport = {
      wishlist: { name: null, description: null },
      itemsURLs: null,
    };
    const wishlist: IList = await this.findOne(id);
    listExport.wishlist.description = wishlist.description;
    listExport.wishlist.name = wishlist.name;
    listExport.itemsURLs = await this.findItemsURLs(id);
    return listExport;
  }

  async importFromCode(code: string, userId: number) {
    const listExport: IListExport = this.decompress(code);
    const tempList = listExport.wishlist as AssignedListDto;
    tempList.userId = userId;
    const newList = await this.create(tempList).catch(() => {
      throw new HttpException({ error: 'Invalid code' }, HttpStatus.BAD_REQUEST);
    });
    for await (const url of listExport.itemsURLs) {
      await this.itemService.create({ url, wishListID: newList.id });
    }
    return newList;
  }

  async findItems(id: number) {
    return this.itemRepository
      .createQueryBuilder()
      .select()
      .where('item.wishListID = :id', { id })
      .getMany();
  }

  async findItemsURLs(id: number): Promise<string[]> {
    const urls: string[] = [];
    const urlsObj = await this.itemRepository
      .createQueryBuilder()
      .select('item.url')
      .where('item.wishListID = :id', { id })
      .getRawMany();
    for (let i = 0; i < urlsObj.length; i++) {
      urls.push(urlsObj[i].url); //Really finicky with the type of loop because it's an any[]
    }
    return urls;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return this.listRepository.update(id, updateListDto);
  }

  async remove(id: number) {
    this.itemRepository
      .createQueryBuilder()
      .delete()
      .where('wishListID = :id', { id })
      .execute();

    return this.listRepository.delete(id);
  }

  compress(obj: Record<string, any>) {
    return OrbitEncoder.encodeWithURIsafe(obj);
  }

  decompress(str: string) {
    return OrbitEncoder.decodeURIsafe(str);
  }
}
