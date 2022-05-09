import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ItemModule } from '../item/item.module';
import { Item } from '../item/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, Item]), ItemModule],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
