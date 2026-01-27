
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AdminStats {
  totalClients: number;
  totalAbonnements: number;
  demandesEnCours: number;
  revenuMensuel: number;
  revenuAnnuel: number;
  tauxConversion: number;
  satisfaction: number;
}

export interface Client {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateInscription: Date;
  statut: 'ACTIF' | 'INACTIF' | 'BLOQUE';
  derniereConnexion: Date;
  abonnementsActifs: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  getStats(): Observable<AdminStats> {
    return of({
      totalClients: 1250,
      totalAbonnements: 1890,
      demandesEnCours: 42,
      revenuMensuel: 75250,
      revenuAnnuel: 903000,
      tauxConversion: 68.5,
      satisfaction: 92.3
    });
  }
  
  getClients(): Observable<Client[]> {
    // Données fictives
    const clients: Client[] = [
      {
        id: 1,
        nom: 'Ben Ali',
        prenom: 'Mohamed',
        email: 'mohamed@example.com',
        telephone: '22 123 456',
        dateInscription: new Date('2024-01-15'),
        statut: 'ACTIF',
        derniereConnexion: new Date('2024-01-26'),
        abonnementsActifs: 2
      },
      // ... plus de clients
    ];
    return of(clients);
  }
  
  getDemandesRecent(): Observable<any[]> {
    return of([]); // À remplacer avec votre service de demandes
  }
}