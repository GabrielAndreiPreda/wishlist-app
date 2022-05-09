export interface Message {
  message: string;
}

export interface IList {
  id: number;

  name: string;

  description: string;

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

  url: string;

  image: string;
}

export interface IListExport {
  wishlist: { name: string; description: string };
  itemsURLs: string[];
}
