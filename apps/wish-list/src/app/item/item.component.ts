import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IItem } from '@wishlist-app/api-interfaces';
import { APIService } from '../api.service';

@Component({
  selector: 'wishlist-app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: IItem;
  @Output() deleteItemEvent = new EventEmitter<string>();
  constructor(private apiService: APIService) {}

  async increaseQuantity() {
    this.item.quantity++; //Fludization for the front-end
    return await this.apiService
      .updateItem(this.item.id, {
        quantity: this.item.quantity,
      })
      .catch((error) => {
        //console.log(error);
        this.item.quantity--;
      });
  }
  async decreaseQuantity() {
    this.item.quantity--;
    return await this.apiService
      .updateItem(this.item.id, {
        quantity: this.item.quantity,
      })
      .catch((error) => {
        //console.log(error);
        this.item.quantity++;
      });
  }
  private async refreshItem() {
    this.item = await this.apiService.getItem(this.item.id);
  }

  openItemLink() {
    window.open(this.item.url);
  }
  async toggleBought() {
    this.item.isBought = !this.item.isBought;
    return await this.apiService
      .updateItem(this.item.id, {
        isBought: this.item.isBought,
      })
      .catch((error) => {
        console.log(error);
        this.item.isBought = !this.item.isBought;
      });
  }
  async deleteItem() {
    await this.apiService.deleteItem(this.item.id).then(() => {
      this.deleteItemEvent.emit();
    });
  }
}
