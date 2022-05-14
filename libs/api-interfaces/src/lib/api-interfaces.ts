import { Request } from 'express';

export interface Message {
  message: string;
}

export interface IList {
  id: number;
  userId: number;

  name: string;

  description: string;

  addedOn: Date;
}

export interface IItem {
  id: number;

  wishListID: number;
  host: string;

  title: string;

  description: string;

  quantity: number;

  isBought: boolean;

  addedOn: Date;

  url: string;

  image: string;
}

export interface IListExport {
  wishlist: { name: string; description: string };
  itemsURLs: string[];
}

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    userId: number;
    username: string;
  };
}
