import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compressed } from 'compress-json';
import { APIService } from '../api.service';

@Component({
  selector: 'wishlist-app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss'],
})
export class ImportDialogComponent {
  code!: Compressed;
  constructor(
    private apiService: APIService,
    public dialogRef: MatDialogRef<ImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public reloadWishlistsEvent: EventEmitter<string>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyText() {
    navigator.clipboard.writeText(JSON.stringify(this.code));
  }
}
