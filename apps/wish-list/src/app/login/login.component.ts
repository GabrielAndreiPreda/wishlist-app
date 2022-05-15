import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'wishlist-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registerError = '';
  registerHint = '';

  loginError = '';
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: '',
      password: '',
    });
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
    document.body.className = ''; //Turn off darkmode
  }
  async register() {
    const authInfo: { username: string; password: string } =
      this.registerForm.getRawValue();
    try {
      await this.authService.register(authInfo.username, authInfo.password);
      this.router.navigate(['home']);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.registerError = error.error.message;
        console.log(error);
      }
    }
  }
  async login() {
    const authInfo: { username: string; password: string } = this.loginForm.getRawValue();
    try {
      await this.authService.login(authInfo.username, authInfo.password);
      this.router.navigate(['home']);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.loginError = error.error.message;
        console.log(error);
      }
    }
  }
}
