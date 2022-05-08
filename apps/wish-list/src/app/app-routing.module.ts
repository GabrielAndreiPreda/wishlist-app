import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainUIComponent } from './main-ui/main-ui.component';
import { MainUIResolver } from './mainUI.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainUIComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
