// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  
  constructor() {
    // Utilisateur fictif pour le développement
    this.currentUserSubject.next({
      id: 1,
      nom: 'Mohamed',
      prenom: 'Ben Ali',
      email: 'mohamed@example.com',
      role: 'CLIENT'
    });
  }
  
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
  
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
  
  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'ADMIN';
  }
  
  isClient(): boolean {
    return this.getCurrentUser()?.role === 'CLIENT';
  }
  
  logout(): void {
    this.currentUserSubject.next(null);
  }
}