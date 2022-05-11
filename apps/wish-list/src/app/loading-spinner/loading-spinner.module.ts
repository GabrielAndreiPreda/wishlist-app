import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule, BrowserAnimationsModule],
  exports: [LoadingSpinnerComponent],
})
export class LoadingSpinnerModule {}
