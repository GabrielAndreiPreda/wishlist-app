import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IList, IListExport } from '@wishlist-app/api-interfaces';
import { IItem } from '@wishlist-app/api-interfaces';
import { catchError, tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private wishlistsURL = 'http://localhost:3333/api/wishlists/';
  private getItemsURL = 'http://localhost:3333/api/wishlists/items/';
  private itemsURL = 'http://localhost:3333/api/items/';
  private importURL = 'http://localhost:3333/api/wishlists/import/';
  private exportURL = 'http://localhost:3333/api/wishlists/export/';

  constructor(private http: HttpClient) {}

  // Wishlist CRUD
  async createWishlist(wishlistName: string) {
    return await lastValueFrom(
      this.http.post<IList>(this.wishlistsURL, { name: wishlistName })
    );
  }
  async getWishlist(id: number) {
    return await lastValueFrom(this.http.get<IList>(this.wishlistsURL + id));
  }
  async getAllWishlists() {
    return await lastValueFrom(this.http.get<IList[]>(this.wishlistsURL));
  }
  async getItemsFromWishlist(id: number) {
    return await lastValueFrom(this.http.get<IItem[]>(this.getItemsURL + id.toString()));
  }
  async updateWishlist(id: number, wishlist: Partial<IList>) {
    return await lastValueFrom(
      this.http.patch<IList>(this.wishlistsURL + id.toString(), wishlist)
    );
  }
  async deleteWishlist(id: number) {
    return await lastValueFrom(this.http.delete(this.wishlistsURL + id.toString()));
  }

  //Item CRUD
  async createItem(wishListID: number, url: string) {
    return await lastValueFrom(
      this.http.post<IItem>(this.itemsURL, {
        wishListID,
        url,
      })
    );
  }
  async getItem(id: number) {
    return await lastValueFrom(this.http.get<IItem>(this.itemsURL + id));
  }

  async updateItem(id: number, item: Partial<IItem>) {
    return await lastValueFrom(this.http.patch(this.itemsURL + id, item));
  }
  async deleteItem(id: number) {
    return await lastValueFrom(this.http.delete(this.itemsURL + id.toString()));
  }

  // Import / Export
  async getExportCode(id: number) {
    return await lastValueFrom(this.http.get<string>(this.exportURL + id.toString()));
  }

  async importFromCode(code: string) {
    return await lastValueFrom(this.http.post<string>(this.importURL, { code }));
  }
}
