import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { IList } from '@wishlist-app/api-interfaces';

@Component({
  selector: 'wishlist-app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() parentSidenav!: MatSidenav;
  @Input() wishlist: IList | null = null;
  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  toggleSidenav() {
    this.parentSidenav.toggle();
  }
}
