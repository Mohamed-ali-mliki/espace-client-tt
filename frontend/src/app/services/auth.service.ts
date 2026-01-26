
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  codePostal: string;
  dateInscription: Date;
  role: 'CLIENT' | 'ADMIN';
  statut: 'ACTIF' | 'INACTIF' | 'EN_ATTENTE';
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticated = true;

  constructor() {
    // Données de test
    this.currentUserSubject.next({
      id: 1,
      nom: 'Ben Ali',
      prenom: 'Mohamed',
      email: 'mohamed@example.com',
      telephone: '22 123 456',
      adresse: 'Rue de la Liberté, Tunis',
      ville: 'Tunis',
      codePostal: '1000',
      dateInscription: new Date('2024-01-01'),
      role: 'CLIENT',
      statut: 'ACTIF',
      avatar: 'https://ui-avatars.com/api/?name=Mohamed+Ben+Ali&background=667eea&color=fff'
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated && this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'ADMIN';
  }

  isClient(): boolean {
    return this.getCurrentUser()?.role === 'CLIENT';
  }
}