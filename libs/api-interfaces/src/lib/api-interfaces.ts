export interface Message {
  message: string;
}

export interface IList {
  id: number;

  name: string;

  addedOn: Date;
}

export interface IItem {
  id: number;

  wishListID: number;

  title: string;

  description: string;

  quantity: number;

  isBought: boolean;

  addedOn: Date;

  image: string;
}
