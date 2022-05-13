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
  constructor(
    private apiService: APIService,
    public dialogRef: MatDialogRef<ImportDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async importFromCode(code: string) {
    this.toggleLoadingSpinner();
    try {
      await this.apiService.importFromCode(code);
      this.dialogRef.close(true);
    } catch (error) {
      console.log(error);
      this.toggleLoadingSpinner();
    }
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
  private toggleLoadingSpinner() {
    this.isLoading = !this.isLoading;
  }
}
