import { Component, Input, OnInit } from '@angular/core';
import { IItem } from '@wishlist-app/api-interfaces';
import { APIService } from '../api.service';

@Component({
  selector: 'wishlist-app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item!: IItem;
  constructor(private apiService: APIService) {}

  ngOnInit(): void {}

  async increaseQuantity() {
    return await this.apiService.updateItem(this.item.id, {
      quantity: this.item.quantity + 1,
    });
  }
  async decreaseQuantity() {
    return await this.apiService.updateItem(this.item.id, {
      quantity: this.item.quantity - 1,
    });
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
