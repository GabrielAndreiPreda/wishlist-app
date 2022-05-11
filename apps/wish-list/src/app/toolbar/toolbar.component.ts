import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { IList } from '@wishlist-app/api-interfaces';
import { APIService } from '../api.service';
import { ImportDialogComponent } from '../import-dialog/import-dialog.component';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

@Component({
  selector: 'wishlist-app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() parentSidenav!: MatSidenav;
  @Input() wishlist!: IList | null;
  @Output() reloadWishlistsEvent = new EventEmitter<string>();
  isEditing = false;
  newWishlistName = '';
  constructor(private apiService: APIService, public dialog: MatDialog) {}

  toggleSidenav() {
    this.parentSidenav.toggle();
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  getNewWishlistName(name: string) {
    this.newWishlistName = name;
  }

  async saveNewWishlistName() {
    if (this.wishlist) {
      this.apiService
        .updateWishlist(this.wishlist.id, {
          name: this.newWishlistName,
        })
        .then(() => {
          this.reloadWishlistsEvent.emit();
          this.toggleEditing();
        });
    }
  }
  async deleteWishlist() {
    return this.wishlist
      ? this.apiService.removeWishlist(this.wishlist.id).then(() => {
          this.reloadWishlistsEvent.emit();
        })
      : null; //Error display to be implemented
  }

  openExportDialog(): void {
    if (this.wishlist) {
      const dialogRef = this.dialog.open(ShareDialogComponent, {
        width: '50%',
        data: this.wishlist,
      });
    }
  }
  openImportDialog(): void {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '50%',
      data: this.reloadWishlistsEvent,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.reloadWishlistsEvent.emit();
      }
    });
  }
}
