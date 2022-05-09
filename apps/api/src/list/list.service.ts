import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IListExport } from '@wishlist-app/api-interfaces';
import { OrbitEncoder } from 'orbit-encoder';
import { Repository } from 'typeorm';
import { Item } from '../item/entities/item.entity';
import { ItemService } from '../item/item.service';
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
  create(createListDto: CreateListDto) {
    const newList = this.listRepository.create(createListDto);
    return this.listRepository.save(newList);
  }

  findAll() {
    return this.listRepository.find({
      order: {
        addedOn: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return await this.listRepository.findOne(id);
  }

  async getExportCode(id: number) {
    return JSON.stringify(this.getCompressed(await this.getListExport(id)));
  }
  private async getListExport(id: number) {
    const listExport: IListExport = {
      wishlistName: null,
      itemsURLs: null,
    };
    listExport.wishlistName = (await this.findOne(id)).name;
    listExport.itemsURLs = await this.findItemsURLs(id);
    return listExport;
  }

  async importFromCode(code: string) {
    console.log(code);
    const listExport: IListExport = this.getDecompress(code);
    console.log(listExport);
    const newList = await this.create({ name: listExport.wishlistName });
    listExport.itemsURLs.forEach((URL) => {
      this.itemService.create({ URL, wishListID: newList.id });
    });
  }

  async findItems(id: number) {
    return this.itemRepository.createQueryBuilder().select().where('item.wishListID = :id', { id }).getMany();
  }

  async findItemsURLs(id: number) {
    return this.itemRepository
      .createQueryBuilder()
      .select('item.URL')
      .where('item.wishListID = :id', { id })
      .getRawMany();
  }

  update(id: number, updateListDto: UpdateListDto) {
    return this.listRepository.update(id, updateListDto);
  }

  async remove(id: number) {
    this.itemRepository.createQueryBuilder().delete().where('wishListID = :id', { id }).execute();

    return this.listRepository.delete(id);
  }

  getCompressed(obj: Record<string, any>) {
    return OrbitEncoder.encodeWithURIsafe(obj);
  }

  getDecompress(str: string) {
    console.log(OrbitEncoder.decodeURIsafe(str));
    return OrbitEncoder.decodeURIsafe(str);
  }
}
