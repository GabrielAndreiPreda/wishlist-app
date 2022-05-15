import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerURL = 'http://localhost:3333/api/users/register';
  loginURL = 'http://localhost:3333/api/auth/login';

  constructor(private http: HttpClient) {}

  async register(username: string, password: string) {
    return lastValueFrom(this.http.post(this.registerURL, { username, password }));
  }
  async login(username: string, password: string) {
    return lastValueFrom(
      this.http.post(this.loginURL, { username, password }, { withCredentials: true })
    );
  }
}
