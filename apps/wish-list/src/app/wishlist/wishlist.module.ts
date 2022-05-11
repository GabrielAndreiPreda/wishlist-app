import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ItemComponent } from '../item/item.component';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [WishlistComponent, ItemComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    LoadingSpinnerModule,
  ],
  exports: [WishlistComponent],
})
export class WishlistModule {}
