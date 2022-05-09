import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IList, IListExport } from '@wishlist-app/api-interfaces';
import { IItem } from '@wishlist-app/api-interfaces';
import { catchError, tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { Compressed } from 'compress-json';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private wishlistsURL = 'api/wishlists';
  private getItemsURL = 'api/wishlists/items';
  private itemsURL = 'api/items';

  constructor(private http: HttpClient) {}

  async getAllWishlists() {
    return await lastValueFrom(this.http.get<IList[]>(this.wishlistsURL));
  }

  async removeWishlist(id: number) {
    return await lastValueFrom(
      this.http.delete(this.wishlistsURL + '/' + id.toString())
    );
  }
  async createWishlist(wishlistName: string) {
    return await lastValueFrom(
      this.http.post<IList>(this.wishlistsURL, { name: wishlistName })
    );
  }

  async updateWishlist(id: number, wishlist: Partial<IList>) {
    return await lastValueFrom(
      this.http.patch<IList>(this.wishlistsURL + '/' + id.toString(), wishlist)
    );
  }

  async getItemsFromWishlist(id: number) {
    return await lastValueFrom(
      this.http.get<IItem[]>(this.getItemsURL + '/' + id.toString())
    );
  }

  async getExportCode(id: number) {
    return await lastValueFrom(
      this.http.get<Compressed>(this.wishlistsURL + '/export/' + id.toString())
    );
  }
  // async importFromCode(code: Compressed) {
  //   return await lastValueFrom(
  //     this.http.post<Compressed>(this.wishlistsURL + '/import/', { code })
  //   );
  // }

  async addItem(wishListID: number, URL: string) {
    return await lastValueFrom(
      this.http.post<IItem>(this.itemsURL, {
        wishListID,
        URL,
      })
    );
  }

  async updateItem(id: number, item: Partial<IItem>) {
    throw new Error('Method not implemented.');
  }
}
