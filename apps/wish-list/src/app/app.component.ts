import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@wishlist-app/api-interfaces';

@Component({
  selector: 'wishlist-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<JSON>('/api/wishlist');
  constructor(private http: HttpClient) {}
}
