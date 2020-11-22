import { JwtResponse } from '../interfaces/jwt-response.interface';
import { LoginResponse } from './../interfaces/login-response.interface'
import { RegisterResponse } from './../interfaces/register-response.interface';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthModel } from '../models/auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ACCESS_TOKEN = 'ACCESS_TOKEN';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtHelperService
  ) { }

  register(userRegister: User) {
    return this.http.post<RegisterResponse>('/users/register', userRegister).pipe(
      tap(() => {
        this.router.navigateByUrl('/');
      })
    );
  }

  login(auth: AuthModel) {
    return this.http.post<LoginResponse>('/users/login', auth).pipe(
      tap(response => {
        this.saveToken(response.success);
        this.router.navigateByUrl('/inicio');
      })
    );
  }

  getUserInfo(): JwtResponse {
    return this.jwtService.decodeToken(this.getToken());
  }

  private saveToken(token: string): void {
    sessionStorage.setItem(this.ACCESS_TOKEN, token);
  }

  getToken(): string {
    return sessionStorage.getItem(this.ACCESS_TOKEN);
  }

  logout(): void {
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    this.router.navigateByUrl('');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
