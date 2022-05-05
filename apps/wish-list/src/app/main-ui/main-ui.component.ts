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
import {
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'wishlist-app-main-ui',
  templateUrl: './main-ui.component.html',
  styleUrls: ['./main-ui.component.scss'],
})
export class MainUIComponent implements OnInit {
  wishlists: IList[] = [];
  selectedWishlist: IList | null = null;
  wishlistControl = new FormControl('', [
    Validators.pattern('^.*[a-zA-Z]+(.|\\s)*$'),
    Validators.maxLength(20),
  ]);

  @ViewChild('wishlistSelector') wishlistSelector!: MatSelectionList;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private get newWishlistName(): string {
    // property
    return this.wishlistControl.value;
  }

  constructor(
    private apiService: APIService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadWishlists().then(() => {
      this.selectFirstWishlist();
    });
  }

  private selectFirstWishlist() {
    this.selectedWishlist = this.wishlists[0] ? this.wishlists[0] : null;
  }

  private async loadWishlists() {
    this.wishlists = await this.apiService.getAllWishlists();
  }

  async createWishlist() {
    await this.apiService.createWishlist(this.newWishlistName);
    window.location.reload();
  }

  /* wishlistTrackBy(index: number, wishlist: IList) {
    return wishlist.id;
  } */

  onSelection(event: MatSelectionListChange): void {
    this.selectedWishlist =
      this.wishlists[this.wishlistSelector.selectedOptions.selected[0]?.value];
    this.eventService.newEvent(event);
  }

  resetWishlistForm(): void {
    this.wishlistControl.reset();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
