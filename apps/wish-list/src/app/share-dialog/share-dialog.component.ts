import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItem, IList, IListExport } from '@wishlist-app/api-interfaces';
import { APIService } from '../api.service';
import fileDownload from 'js-file-download';

@Component({
  selector: 'wishlist-app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss'],
})
export class ShareDialogComponent {
  code!: string;
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

  copyToClipboard() {
    navigator.clipboard.writeText(this.code);
  }
  downloadCode() {
    fileDownload(this.code, `${this.wishlist.name}` + '.bkp');
  }
}
