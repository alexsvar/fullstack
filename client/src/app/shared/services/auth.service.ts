import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Позволяет вытащить что-либо из стрима

import { User } from '../interfaces';

@Injectable()
export class AuthService {
  
  private token = null;
  
  constructor(private http: HttpClient) {}
  
  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }
  
  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      )
    
  }
  
  // Для переопределения значения приватной переменной this.token на значение token
  setToken(token: string) {
    this.token = token;
  }
  
  // Для того чтобы получать значение token в других классах, добавлять его к различным запросам
  getToken(): string {
    return this.token;
  }
  
  isAuthenticated(): boolean {
    return !!this.token;
  }
  
  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
