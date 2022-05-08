import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { IList } from '@wishlist-app/api-interfaces';
import { Observable, of } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MainUIResolver implements Resolve<Promise<IList[]>> {
  constructor(private apiService: APIService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<IList[]> {
    console.log('bananas');
    return this.loadWishlists();
  }

  private async loadWishlists() {
    return await this.apiService.getAllWishlists();
  }
}
