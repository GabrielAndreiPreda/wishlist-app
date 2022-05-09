import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MainUIComponent } from './main-ui/main-ui.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainUIModule } from './main-ui/main-ui.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { MatIcon } from '@angular/material/icon';
import { EditingFormComponent } from './editing-form/editing-form.component';
import { ItemComponent } from './item/item.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { MainUIResolver } from './mainUI.resolver';
import { APIService } from './api.service';
import { ImportDialogComponent } from './import-dialog/import-dialog.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MainUIModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [MainUIResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
