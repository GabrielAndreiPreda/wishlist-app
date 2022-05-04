import { Component, OnInit, ViewChild } from '@angular/core';
import { IList } from '@wishlist-app/api-interfaces';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { APIService } from '../api.service';
import { EventService } from '../event.service';

@Component({
  selector: 'wishlist-app-main-ui',
  templateUrl: './main-ui.component.html',
  styleUrls: ['./main-ui.component.scss'],
})
export class MainUIComponent implements OnInit {
  wishlistName = '';
  wishlists: IList[] = [];
  selectedWishlistID: number | null = null;

  constructor(
    private apiService: APIService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadWishlists();
  }

  async loadWishlists() {
    this.wishlists = await this.apiService.getAllWishlists();
    console.log(this.wishlists);
  }

  wishlistTrackBy(index: number, wishlist: IList) {
    return wishlist.id;
  }

  onSelection(event: any, value: number) {
    this.selectedWishlistID = value;
    this.eventService.newEvent(event);
  }
}
