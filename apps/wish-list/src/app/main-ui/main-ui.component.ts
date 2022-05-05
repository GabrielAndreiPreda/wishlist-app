import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IList } from '@wishlist-app/api-interfaces';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { APIService } from '../api.service';
import { EventService } from '../event.service';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'wishlist-app-main-ui',
  templateUrl: './main-ui.component.html',
  styleUrls: ['./main-ui.component.scss'],
})
export class MainUIComponent implements OnInit {
  wishlists: IList[] = [];
  selectedWishlistID: number | null = null;
  wishlistControl = new FormControl('', [Validators.required]);

  private get newWishlistName(): string {
    // property
    return this.wishlistControl.value;
  }

  constructor(
    private apiService: APIService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadWishlists();
  }

  async loadWishlists() {
    this.wishlists = await this.apiService.getAllWishlists();
  }

  async createWishlist() {
    await this.apiService.createWishlist(this.newWishlistName);
    await this.loadWishlists();
  }

  wishlistTrackBy(index: number, wishlist: IList) {
    return wishlist.id;
  }

  onSelection(event: unknown, wishlistSelector: any) {
    this.selectedWishlistID =
      wishlistSelector.selectedOptions.selected[0]?.value;
    this.eventService.newEvent(event);
  }

  resetWishlistForm() {
    this.wishlistControl.setValue('');
  }
}
