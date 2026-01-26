import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Interface pour les offres d'abonnement
interface OffreAbonnement {
  id: number;
  nom: string;
  type: 'ADSL' | 'FIBRE' | 'MOBILE' | 'FIXE' | 'PACK';
  categorie: string;
  vitesse: string;
  prix: number;
  prixOriginal?: number;
  caracteristiques: string[];
  miseEnAvant?: boolean;
  populaire?: boolean;
  promotion?: {
    libelle: string;
    dateFin: string;
  };
}

// Interface pour les abonnements utilisateur
interface AbonnementUtilisateur {
  id: number;
  nom: string;
  type: string;
  statut: 'ACTIF' | 'EN_ATTENTE' | 'RESILIE';
  prix: number;
  dateActivation: string;
  dateRenouvellement: string;
  peutAmeliorer: boolean;
  details?: {
    adresse?: string;
    numeroTelephone?: string;
    dureeContrat?: string;
  };
}

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  
  // Section : Mes abonnements actuels
  mesAbonnements: AbonnementUtilisateur[] = [
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

  // Section : Catalogue des offres disponibles
  offres: OffreAbonnement[] = [
    // Offres ADSL
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
    
    // Offres FIBRE
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
    },
    
    // Offres MOBILE
    {
      id: 6,
      nom: 'Mobile Start',
      type: 'MOBILE',
      categorie: 'Économique',
      vitesse: '10 Go',
      prix: 15,
      caracteristiques: [
        '10 Go internet',
        'Appels illimités',
        'SMS illimités',
        'Réseau 4G'
      ],
      populaire: false
    },
    {
      id: 7,
      nom: 'Mobile Pro',
      type: 'MOBILE',
      categorie: 'Professionnel',
      vitesse: '25 Go',
      prix: 25,
      caracteristiques: [
        '25 Go internet',
        '5G incluse',
        'Appels internationaux',
        'Roaming 5 Go'
      ],
      populaire: true
    },
    {
      id: 8,
      nom: 'Mobile Premium',
      type: 'MOBILE',
      categorie: 'Premium',
      vitesse: 'Illimité',
      prix: 60,
      caracteristiques: [
        'Internet illimité',
        '5G ultra-rapide',
        'Roaming 10 Go',
        'Services divertissement gratuits'
      ],
      populaire: false
    },
    
    // Offres PACK
    {
      id: 9,
      nom: 'Pack Famille',
      type: 'PACK',
      categorie: 'Familial',
      vitesse: 'Fibre + Mobile',
      prix: 59,
      prixOriginal: 70,
      caracteristiques: [
        'Fibre 20 Mbps',
        'Mobile 10 Go',
        'TV sur IP incluse',
        'Économie 20%',
        'Facture unique'
      ],
      populaire: true,
      promotion: {
        libelle: 'Économie 20%',
        dateFin: '31/03/2024'
      }
    }
  ];

  // Filtrage des offres
  filtreType: string = 'tout';
  offresFiltrees: OffreAbonnement[] = this.offres;

  // Méthode pour filtrer les offres
  filtrerOffres(type: string) {
    this.filtreType = type;
    if (type === 'tout') {
      this.offresFiltrees = this.offres;
    } else {
      this.offresFiltrees = this.offres.filter(offre => offre.type === type);
    }
  }

  // Méthode pour s'abonner
  sAbonner(offre: OffreAbonnement) {
    console.log('Demande d\'abonnement :', offre);
    // Redirection vers la page de demande
    // this.router.navigate(['/demande'], { state: { offre: offre } });
  }

  // Méthode pour modifier un abonnement
  modifierAbonnement(abonnement: AbonnementUtilisateur) {
    console.log('Demande de modification :', abonnement);
    // this.router.navigate(['/demande/modification', abonnement.id]);
  }

  // Méthode pour résilier un abonnement
  resilierAbonnement(abonnement: AbonnementUtilisateur) {
    if (confirm(`Êtes-vous sûr de vouloir résilier l'abonnement ${abonnement.nom} ?`)) {
      console.log('Demande de résiliation :', abonnement);
      // this.router.navigate(['/demande/resiliation', abonnement.id]);
    }
  }

  // Calculer l'économie
  calculerEconomie(offre: OffreAbonnement): number {
    if (offre.prixOriginal) {
      return Math.round(((offre.prixOriginal - offre.prix) / offre.prixOriginal) * 100);
    }
    return 0;
  }

  // Statistiques
  statistiques = {
    totalAbonnements: 3,
    depenseMensuelle: 80,
    prochainRenouvellement: '12/03/2025'
  };
}