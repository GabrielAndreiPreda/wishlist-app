import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IList } from '@wishlist-app/api-interfaces';
import { IItem } from '@wishlist-app/api-interfaces';
import { catchError, tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private wishlistsURL = 'api/wishlists';
  private getItemsURL = 'api/wishlists/items';
  private itemURL = 'api/items';

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

  async getItemsFromWishlist(id: number) {
    return await lastValueFrom(
      this.http.get<IItem[]>(this.getItemsURL + '/' + id.toString())
    );
  }
}
