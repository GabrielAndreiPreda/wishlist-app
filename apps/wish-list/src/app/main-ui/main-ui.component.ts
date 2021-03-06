import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IList } from '@wishlist-app/api-interfaces';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { APIService } from '../api.service';

import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { last } from 'rxjs';

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
    Validators.required,
  ]);

  @ViewChild('wishlistSelector') wishlistSelector!: MatSelectionList;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private get newWishlistName(): string {
    // property
    return this.wishlistControl.value;
  }

  private get selectedWishlistIndex() {
    return this.wishlistSelector.selectedOptions.selected[0]?.value;
  }

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.loadWishlists().then(() => {
      this.selectFirstWishlist();
    });
  }

  private selectFirstWishlist() {
    this.selectedWishlist = this.wishlists[0] ? this.wishlists[0] : null;
  }
  private selectLastWishlist() {
    let lastIndex = this.wishlists.length - 1;
    this.selectedWishlist = this.wishlists[lastIndex] ? this.wishlists[lastIndex] : null;
  }

  private async loadWishlists() {
    this.wishlists = await this.apiService.getAllWishlists();
  }

  async reloadWishlists() {
    this.wishlists = await this.apiService.getAllWishlists();
    if (!this.selectedWishlistIndex) {
      this.selectFirstWishlist();
      return;
    }
    if (this.selectedWishlistIndex >= this.wishlists.length) {
      this.selectLastWishlist();
      return;
    }

    this.onSelection();
  }

  async createWishlist() {
    if (this.wishlistControl.status === 'VALID') {
      try {
        this.wishlists.unshift(
          await this.apiService.createWishlist(this.newWishlistName)
        );
        this.resetWishlistForm();
        this.selectFirstWishlist();
      } catch (error) {
        console.log(error); //Future snackbar
      }
    }
  }

  /* wishlistTrackBy(index: number, wishlist: IList) {
    return wishlist.id;
  } */

  onSelection(): void {
    this.selectedWishlist = this.wishlists[this.selectedWishlistIndex];
  }

  resetWishlistForm(): void {
    this.wishlistControl.reset();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
  toggleDarkMode(event: MatSlideToggleChange) {
    if (event.checked) {
      document.body.className = 'dark-theme';
    } else {
      document.body.className = '';
    }
  }
}
