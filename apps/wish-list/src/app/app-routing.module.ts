import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainUIComponent } from './main-ui/main-ui.component';
import { MainUIResolver } from './mainUI.resolver';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainUIComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
