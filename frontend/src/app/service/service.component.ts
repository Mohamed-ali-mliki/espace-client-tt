import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  role?: string;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://api.tunisietelecom.tn/auth/login';

  constructor(private http: HttpClient) {}

  // Méthode pour authentifier l'utilisateur
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials);
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Obtenir le rôle de l'utilisateur
  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }
}
