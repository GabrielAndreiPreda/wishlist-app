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
  private wishlistsURL = 'api/wishlist';
  private itemsURL = 'api/wishlist/items';

  constructor(private http: HttpClient) {}

  async getAllWishlists() {
    return await lastValueFrom(this.http.get<IList[]>(this.wishlistsURL));
  }

  async removeWishlist(id: string) {
    return await lastValueFrom(this.http.delete(this.wishlistsURL + '/' + id));
  }

  async getItemsFromWishlist(id: string) {
    return await lastValueFrom(
      this.http.get<IItem[]>(this.itemsURL + '/' + id)
    );
  }
}
