import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../item/entities/item.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

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

  findOne(id: number) {
    return this.listRepository.findByIds([id]);
  }

  findItems(id: number) {
    return this.itemRepository
      .createQueryBuilder()
      .select()
      .where('item.wishListID = :id', { id })
      .getMany();
  }

  update(id: number, updateListDto: UpdateListDto) {
    return this.listRepository.update(id, updateListDto);
  }

  async remove(id: number) {
    this.itemRepository
      .createQueryBuilder()
      .delete()
      .from(Item)
      .where('wishListID = :id', { id })
      .execute();

    return this.listRepository.delete(id);
  }
}
