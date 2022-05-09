import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'wishlist',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ItemModule,
    ListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
