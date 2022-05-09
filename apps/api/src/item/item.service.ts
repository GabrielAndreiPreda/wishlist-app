import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { map, Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as jsdom from 'jsdom';
import { MetaTags } from '../meta-tags';
import imageToBase64 = require('image-to-base64');
import { ItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>
  ) {}
  async create(createItemDto: CreateItemDto) {
    let dom: jsdom.JSDOM;
    /* const resourceLoader = new jsdom.ResourceLoader({
      userAgent:
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
    }); */
    const metaTags = new MetaTags();
    try {
      dom = await jsdom.JSDOM.fromURL(createItemDto.URL);
    } catch (e) {
      return 'Retrieval error';
    }
    if (!metaTags.importTagsFromDOM(dom)) {
      return 'No tags found';
    }

    let newItem = new ItemDto();
    newItem = metaTags as unknown as ItemDto;
    newItem.wishListID = createItemDto.wishListID;
    newItem.URL = createItemDto.URL;
    await this.saveURLImageAsB64(metaTags, newItem);

    return this.itemRepository.save(newItem);
  }

  async findAll() {
    return this.itemRepository.find();
  }

  async findAllOnWishlist(id: number) {
    return this.itemRepository
      .createQueryBuilder('item')
      .where('item.wishListID = :id', { id })
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepository.update(id, updateItemDto);
  }

  async remove(id: number) {
    return this.itemRepository.delete(id);
  }

  private async saveURLImageAsB64(metaTags: MetaTags, newItem: ItemDto) {
    await imageToBase64(metaTags.image) // Path to the image
      .then((response) => {
        newItem.image = response; // "cGF0aC90by9maWxlLmpwZw=="
      })
      .catch((error) => {
        newItem.image = metaTags.image ? metaTags.image : '';
        console.log(error);
      });
  }
}
