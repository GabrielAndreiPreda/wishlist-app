import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MainUIComponent } from './main-ui.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { EditingFormComponent } from '../editing-form/editing-form.component';
import { EditingFormModule } from '../editing-form/editing-form.module';
import { WishlistModule } from '../wishlist/wishlist.module';

@NgModule({
  declarations: [MainUIComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCardModule,
    ToolbarModule,
    EditingFormModule,
    WishlistModule,
  ],
  exports: [MainUIComponent],
})
export class MainUIModule {}
