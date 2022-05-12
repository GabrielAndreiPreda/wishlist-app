import { Component, Input, OnInit } from '@angular/core';
import { IItem } from '@wishlist-app/api-interfaces';
import { APIService } from '../api.service';

@Component({
  selector: 'wishlist-app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: IItem;
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
    return;
  }
  toggleBought() {
    return;
  }
  deleteItem() {
    return;
  }
}
