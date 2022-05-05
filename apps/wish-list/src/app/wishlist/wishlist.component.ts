import { Component, Input, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { IItem } from '@wishlist-app/api-interfaces';
import { APIService } from '../api.service';
import { EventService } from '../event.service';

@Component({
  selector: 'wishlist-app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  @Input() wishlistID: number | null = null;
  @Input() parentSidenav: any = null;

  items: IItem[] = [];

  constructor(
    private apiService: APIService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventService.$events.forEach((event) => {
      if (event instanceof MatSelectionListChange) {
        this.changeWishlist(event.options[0].value);
      }
    });
  }

  toggleSidenav() {
    this.parentSidenav.toggle();
  }
  async changeWishlist(id: number) {
    this.items = await this.apiService.getItemsFromWishlist(id);
  }
}
