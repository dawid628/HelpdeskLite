import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

interface LoginResponse {
  token: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8000/api';
  private readonly tokenKey = 'auth_token';

  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Check if user has token
   */
  hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Login user
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          this.currentUser.set(response.user);
        })
      );
  }

  /**
   * Logout user
   */
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
    localStorage.removeItem(this.tokenKey);
    this.currentUser.set(null);
  }

  /**
   * Get current user from API
   */
  me(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/me`)
      .pipe(
        tap(response => {
          this.currentUser.set(response.user);
        })
      );
  }

  /**
   * Get token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
