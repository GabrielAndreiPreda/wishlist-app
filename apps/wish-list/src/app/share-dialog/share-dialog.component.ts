import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { IItem, IList, IListExport } from '@wishlist-app/api-interfaces';
import { Compressed } from 'compress-json';
import { APIService } from '../api.service';

@Component({
  selector: 'wishlist-app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss'],
})
export class ShareDialogComponent {
  code!: Compressed;
  constructor(
    private apiService: APIService,
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public wishlist: IList
  ) {
    this.apiService.getExportCode(wishlist.id).then((code) => {
      this.code = code;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyText() {
    navigator.clipboard.writeText(JSON.stringify(this.code));
  }
}
