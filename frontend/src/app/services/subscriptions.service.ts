import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbonnementUtilisateur } from '../models/subscription.model';
import { OffreAbonnement } from '../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  
  getMesAbonnements(): Observable<AbonnementUtilisateur[]> {
    // Données fictives pour le développement
    const abonnements: AbonnementUtilisateur[] = [
      {
        id: 1001,
        nom: 'Fibre Pro 50 Mbps',
        type: 'FIBRE',
        statut: 'ACTIF',
        prix: 45,
        dateActivation: '12/03/2024',
        dateRenouvellement: '12/03/2025',
        peutAmeliorer: true,
        details: {
          adresse: 'Rue de la Liberté, Tunis',
          dureeContrat: '12 mois'
        }
      },
      {
        id: 1002,
        nom: 'Forfait Mobile 25 Go',
        type: 'MOBILE',
        statut: 'ACTIF',
        prix: 25,
        dateActivation: '15/01/2024',
        dateRenouvellement: '15/02/2025',
        peutAmeliorer: false,
        details: {
          numeroTelephone: '22 123 456',
          dureeContrat: 'Mensuel'
        }
      },
      {
        id: 1003,
        nom: 'Ligne Fixe Classique',
        type: 'FIXE',
        statut: 'ACTIF',
        prix: 10,
        dateActivation: '01/06/2023',
        dateRenouvellement: '01/06/2024',
        peutAmeliorer: true
      }
    ];
    
    return of(abonnements);
  }
  
  getOffres(): Observable<OffreAbonnement[]> {
    // Données fictives pour le développement
    const offres: OffreAbonnement[] = [
      {
        id: 1,
        nom: 'ADSL Start',
        type: 'ADSL',
        categorie: 'Économique',
        vitesse: '4 Mbps',
        prix: 25,
        caracteristiques: [
          'Internet illimité',
          'Installation gratuite',
          'Support technique 24/7',
          'Modem inclus'
        ],
        populaire: false
      },
      {
        id: 2,
        nom: 'ADSL Famille',
        type: 'ADSL',
        categorie: 'Familial',
        vitesse: '8 Mbps',
        prix: 29,
        prixOriginal: 35,
        caracteristiques: [
          'Internet illimité',
          'Débit garanti',
          'Wi-Fi avancé',
          'Support dédié'
        ],
        populaire: true,
        promotion: {
          libelle: 'Offre spéciale',
          dateFin: '31/12/2024'
        }
      },
      {
        id: 3,
        nom: 'Fibre Essential',
        type: 'FIBRE',
        categorie: 'Personnel',
        vitesse: '20 Mbps',
        prix: 39,
        caracteristiques: [
          'Fibre optique',
          'Débit symétrique',
          'Installation offerte',
          'Routeur 4G'
        ],
        populaire: false
      },
      {
        id: 4,
        nom: 'Fibre Pro',
        type: 'FIBRE',
        categorie: 'Professionnel',
        vitesse: '50 Mbps',
        prix: 45,
        prixOriginal: 55,
        caracteristiques: [
          'Fibre optique FTTH',
          'Débit 50 Mbps',
          'IP fixe inclus',
          'Support prioritaire',
          'Garantie 99.9%'
        ],
        miseEnAvant: true,
        populaire: true,
        promotion: {
          libelle: 'Plus populaire',
          dateFin: '30/06/2024'
        }
      },
      {
        id: 5,
        nom: 'Fibre Business',
        type: 'FIBRE',
        categorie: 'Entreprise',
        vitesse: '100 Mbps',
        prix: 69,
        caracteristiques: [
          'Débit 100 Mbps',
          'Routeur Gaming',
          'TV sur IP incluse',
          'Support 24/7',
          'Contrat 24 mois'
        ],
        populaire: false
      }
    ];
    
    return of(offres);
  }
}