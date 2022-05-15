import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { IItem, IList } from '@wishlist-app/api-interfaces';
import { APIService } from '../api.service';

enum SortOptions {
  date = 'Date added',
  store = 'Store',
}

@Component({
  selector: 'wishlist-app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnChanges {
  isLoading = false;
  @Input() wishlist: IList | null = null;
  @Output() reloadWishlistsEvent = new EventEmitter<string>();
  isEditing = false;
  maxLength = 255;
  items: IItem[] = [];
  sortOptions = SortOptions;

  descriptionControl = new FormControl('', [Validators.maxLength(this.maxLength)]);
  itemControl = new FormControl('', [
    Validators.pattern('^.*[a-zA-Z]+(.|\\s)*$'),
    Validators.required,
  ]); // Seems like url regex validation doesn't want to work

  private get newWishlistDescription() {
    return this.descriptionControl.value;
  }

  constructor(private apiService: APIService) {}

  ngOnChanges(): void {
    if (this.wishlist) {
      this.changeWishlist(this.wishlist.id);
      this.descriptionControl.setValue(this.wishlist?.description);
      this.populateItems();
    }
  }

  async changeWishlist(id: number) {
    this.items = await this.apiService.getItemsFromWishlist(id);
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  async saveNewWishlistDescription() {
    if (this.wishlist && this.descriptionControl.valid) {
      await this.apiService.updateWishlist(this.wishlist.id, {
        description: this.newWishlistDescription,
      });

      this.reloadWishlistsEvent.emit();
      this.toggleEditing();
    }
  }

  async populateItems() {
    if (this.wishlist) {
      this.items = await this.apiService.getItemsFromWishlist(this.wishlist.id);
    }
  }
  async addItem() {
    if (this.wishlist) {
      this.toggleLoadingSpinner();
      await this.apiService
        .createItem(this.wishlist.id, this.itemControl.value)
        .catch((error) => {
          console.log(error); //Show in snackbar
        });
      await this.populateItems();
      this.itemControl.reset();
      this.toggleLoadingSpinner();
    }
  }
  async removeItemFromArr(id: number) {
    this.items.splice(id, 1);
  }

  private toggleLoadingSpinner() {
    this.isLoading = !this.isLoading;
  }
}
