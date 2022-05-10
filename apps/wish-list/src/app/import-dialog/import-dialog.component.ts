import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from '../api.service';

@Component({
  selector: 'wishlist-app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss'],
})
export class ImportDialogComponent {
  isLoading = false;
  constructor(private apiService: APIService, public dialogRef: MatDialogRef<ImportDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async importFromCode(code: string) {
    this.isLoading = true;
    return await this.apiService.importFromCode(code).then(() => {
      this.dialogRef.close(true);
    });
  }

  async openFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files != null) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.result) {
          return await this.importFromCode(reader.result.toString());
        } else {
          this.isLoading = false;
          return 'Import error';
        }
      };
      reader.readAsText(file);
    }
  }
}
