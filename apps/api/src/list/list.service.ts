import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IListWithURLs } from '@wishlist-app/api-interfaces';
import { Repository } from 'typeorm';
import { Item } from '../item/entities/item.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { OrbitEncoder } from 'orbit-encoder/lib/OrbitEncoder';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,

    @InjectRepository(Item)
    private itemRepository: Repository<Item>
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
    const listWithItemURLs = await this.getListByIdWithURLs(id);
    return OrbitEncoder.encodeWithURIsafe(listWithItemURLs);
  }
  private async getListByIdWithURLs(id: number) {
    const listWithItemURLs: IListWithURLs = { wishlist: null, itemsURLs: null };
    listWithItemURLs.wishlist = await this.findOne(id);
    listWithItemURLs.itemsURLs = await this.findItemsURLs(
      listWithItemURLs.wishlist.id
    );
    return listWithItemURLs;
  }

  async findItems(id: number) {
    return this.itemRepository
      .createQueryBuilder()
      .select()
      .where('item.wishListID = :id', { id })
      .getMany();
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
    this.itemRepository
      .createQueryBuilder()
      .delete()
      .where('wishListID = :id', { id })
      .execute();

    return this.listRepository.delete(id);
  }
}
