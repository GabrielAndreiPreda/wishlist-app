import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jsdom from 'jsdom';
import { Repository } from 'typeorm';
import { MetaTags } from '../meta-tags';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import imageToBase64 = require('image-to-base64');
import { validate } from 'class-validator';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>
  ) {}
  async create(createItemDto: CreateItemDto) {
    let dom: jsdom.JSDOM;
    const metaTags = new MetaTags();
    let url: URL;
    try {
      url = new URL(createItemDto.url);
    } catch (error) {
      throw new HttpException({ error: 'Invalid URL' }, HttpStatus.BAD_REQUEST);
    }
    createItemDto.url = url.origin + url.pathname; // Remove query

    try {
      dom = await jsdom.JSDOM.fromURL(createItemDto.url);
    } catch (e) {
      throw new HttpException({ error: 'Retrieval error' }, HttpStatus.NOT_FOUND);
    }

    if (!metaTags.importTagsFromDOM(dom)) {
      throw new HttpException(
        { error: "Website doesn't support product extraction" },
        HttpStatus.NOT_FOUND
      );
    }

    let newItem = new ItemDto();
    newItem = metaTags as unknown as ItemDto;
    newItem.wishListID = createItemDto.wishListID;
    newItem.url = createItemDto.url;
    newItem.host = url.hostname.split('.')[1];
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
    return this.itemRepository.findOne(id);
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
