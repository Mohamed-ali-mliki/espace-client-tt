import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { 
  Demande, 
  TypeDemande, 
  StatutDemande, 
  PrioriteDemande, 
  CreationDemande, 
  Commentaire,
  PieceJointe,
  HistoriqueStatut 
} from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private demandes: Demande[] = [];

  constructor() {
    this.initialiserDonneesTest();
  }

  private initialiserDonneesTest(): void {
    this.demandes = [
      {
        id: 1,
        numero: 'DEM-2024-001',
        type: TypeDemande.NOUVELLE_SOUSCRIPTION,
        titre: 'Souscription Fibre 100 Mbps',
        description: 'Je souhaite souscrire à l\'offre Fibre 100 Mbps pour mon domicile.',
        statut: StatutDemande.APPROUVEE,
        priorite: PrioriteDemande.NORMALE,
        dateCreation: new Date('2024-01-15'),
        dateModification: new Date('2024-01-20'),
        dateResolution: new Date('2024-01-18'),
        createdBy: {
          id: 1,
          nom: 'Mohamed Ben Ali',
          email: 'mohamed@example.com',
          role: 'CLIENT'
        },
        assigneA: {
          id: 101,
          nom: 'Sami Technicien',
          email: 'sami@tuniestelecom.tn'
        },
        offreId: 5,
        piecesJointes: [
          {
            id: 1,
            nom: 'cni.pdf',
            url: '/assets/documents/cni.pdf',
            type: 'application/pdf',
            taille: 2048000,
            dateUpload: new Date('2024-01-15')
          }
        ],
        commentaires: [
          {
            id: 1,
            contenu: 'La demande a été reçue et est en cours de traitement.',
            date: new Date('2024-01-15'),
            auteur: {
              id: 101,
              nom: 'Sami Technicien',
              role: 'ADMIN'
            }
          },
          {
            id: 2,
            contenu: 'L\'installation est prévue pour le 25/01/2024.',
            date: new Date('2024-01-18'),
            auteur: {
              id: 101,
              nom: 'Sami Technicien',
              role: 'ADMIN'
            }
          }
        ],
        historique: [
          {
            id: 1,
            ancienStatut: StatutDemande.EN_ATTENTE,
            nouveauStatut: StatutDemande.EN_COURS,
            date: new Date('2024-01-16'),
            modifiePar: {
              id: 101,
              nom: 'Sami Technicien'
            },
            raison: 'Début du traitement'
          },
          {
            id: 2,
            ancienStatut: StatutDemande.EN_COURS,
            nouveauStatut: StatutDemande.APPROUVEE,
            date: new Date('2024-01-18'),
            modifiePar: {
              id: 101,
              nom: 'Sami Technicien'
            },
            raison: 'Éligibilité confirmée'
          }
        ]
      },
      {
        id: 2,
        numero: 'DEM-2024-002',
        type: TypeDemande.MODIFICATION,
        titre: 'Changement d\'offre ADSL 8 → Fibre 20',
        description: 'Je souhaite passer de l\'offre ADSL 8 Mbps à Fibre 20 Mbps.',
        statut: StatutDemande.EN_COURS,
        priorite: PrioriteDemande.NORMALE,
        dateCreation: new Date('2024-01-18'),
        dateModification: new Date('2024-01-19'),
        createdBy: {
          id: 1,
          nom: 'Mohamed Ben Ali',
          email: 'mohamed@example.com',
          role: 'CLIENT'
        },
        abonnementId: 1001,
        commentaires: [
          {
            id: 3,
            contenu: 'Vérification de l\'éligibilité à la fibre en cours.',
            date: new Date('2024-01-19'),
            auteur: {
              id: 102,
              nom: 'Leila Support',
              role: 'ADMIN'
            }
          }
        ],
        historique: [
          {
            id: 3,
            ancienStatut: StatutDemande.EN_ATTENTE,
            nouveauStatut: StatutDemande.EN_COURS,
            date: new Date('2024-01-19'),
            modifiePar: {
              id: 102,
              nom: 'Leila Support'
            },
            raison: 'Prise en charge par le support technique'
          }
        ]
      },
      {
        id: 3,
        numero: 'DEM-2024-003',
        type: TypeDemande.RESILIATION,
        titre: 'Résiliation ligne fixe',
        description: 'Je souhaite résilier ma ligne fixe car je n\'en ai plus l\'utilité.',
        statut: StatutDemande.EN_ATTENTE,
        priorite: PrioriteDemande.BASSE,
        dateCreation: new Date('2024-01-20'),
        dateModification: new Date('2024-01-20'),
        createdBy: {
          id: 1,
          nom: 'Mohamed Ben Ali',
          email: 'mohamed@example.com',
          role: 'CLIENT'
        },
        abonnementId: 1003,
        commentaires: [],
        historique: [
          {
            id: 4,
            ancienStatut: StatutDemande.EN_ATTENTE,
            nouveauStatut: StatutDemande.EN_ATTENTE,
            date: new Date('2024-01-20'),
            modifiePar: {
              id: 1,
              nom: 'Mohamed Ben Ali'
            },
            raison: 'Création de la demande'
          }
        ]
      },
      {
        id: 4,
        numero: 'DEM-2024-004',
        type: TypeDemande.SUPPORT,
        titre: 'Problème de connexion fibre',
        description: 'Ma connexion fibre est intermittente depuis 2 jours.',
        statut: StatutDemande.EN_ATTENTE,
        priorite: PrioriteDemande.HAUTE,
        dateCreation: new Date('2024-01-19'),
        dateModification: new Date('2024-01-20'),
        createdBy: {
          id: 1,
          nom: 'Mohamed Ben Ali',
          email: 'mohamed@example.com',
          role: 'CLIENT'
        },
        abonnementId: 1001,
        commentaires: [],
        historique: []
      }
    ];
  }

  // Obtenir toutes les demandes
  getDemandes(filtres?: any): Observable<Demande[]> {
    let demandesFiltrees = [...this.demandes];
    
    if (filtres) {
      if (filtres.type) {
        demandesFiltrees = demandesFiltrees.filter(d => d.type === filtres.type);
      }
      if (filtres.statut) {
        demandesFiltrees = demandesFiltrees.filter(d => d.statut === filtres.statut);
      }
      if (filtres.priorite) {
        demandesFiltrees = demandesFiltrees.filter(d => d.priorite === filtres.priorite);
      }
    }
    
    return of(demandesFiltrees.sort((a, b) => 
      new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
    ));
  }

  // Obtenir une demande spécifique
  getDemande(id: number): Observable<Demande | undefined> {
    const demande = this.demandes.find(d => d.id === id);
    return of(demande);
  }

  // Créer une nouvelle demande
  creerDemande(demande: CreationDemande): Observable<Demande> {
    const nouvelleDemande: Demande = {
      id: this.demandes.length + 1,
      numero: `DEM-${new Date().getFullYear()}-${(this.demandes.length + 1).toString().padStart(3, '0')}`,
      type: demande.type,
      titre: demande.titre,
      description: demande.description,
      statut: StatutDemande.EN_ATTENTE,
      priorite: demande.priorite,
      dateCreation: new Date(),
      dateModification: new Date(),
      createdBy: {
        id: 1, // En production : this.authService.getCurrentUser().id
        nom: 'Mohamed Ben Ali',
        email: 'mohamed@example.com',
        role: 'CLIENT'
      },
      abonnementId: demande.abonnementId,
      offreId: demande.offreId,
      piecesJointes: [],
      commentaires: [],
      historique: [
        {
          id: 1,
          ancienStatut: StatutDemande.EN_ATTENTE,
          nouveauStatut: StatutDemande.EN_ATTENTE,
          date: new Date(),
          modifiePar: {
            id: 1,
            nom: 'Mohamed Ben Ali'
          },
          raison: 'Création de la demande'
        }
      ]
    };
    
    this.demandes.unshift(nouvelleDemande);
    return of(nouvelleDemande);
  }

  // Ajouter un commentaire
  ajouterCommentaire(demandeId: number, commentaire: string, estInterne: boolean = false): Observable<Commentaire> {
    const demande = this.demandes.find(d => d.id === demandeId);
    if (!demande) {
      throw new Error('Demande non trouvée');
    }
    
    const nouveauCommentaire: Commentaire = {
      id: demande.commentaires.length + 1,
      contenu: commentaire,
      date: new Date(),
      auteur: {
        id: 1, // En production : utilisateur actuel
        nom: 'Mohamed Ben Ali',
        role: 'CLIENT'
      },
      estInterne
    };
    
    demande.commentaires.push(nouveauCommentaire);
    demande.dateModification = new Date();
    
    return of(nouveauCommentaire);
  }

  // Mettre à jour l'état de la demande
  mettreAJourStatut(demandeId: number, nouveauStatut: StatutDemande, raison?: string): Observable<Demande> {
    const demande = this.demandes.find(d => d.id === demandeId);
    if (!demande) {
      throw new Error('Demande non trouvée');
    }
    
    const ancienStatut = demande.statut;
    demande.statut = nouveauStatut;
    demande.dateModification = new Date();
    
    if (nouveauStatut === StatutDemande.TERMINEE || nouveauStatut === StatutDemande.APPROUVEE) {
      demande.dateResolution = new Date();
    }
    
    const nouvelHistorique: HistoriqueStatut = {
      id: demande.historique.length + 1,
      ancienStatut,
      nouveauStatut,
      date: new Date(),
      modifiePar: {
        id: 101, // En production : administrateur actuel
        nom: 'Sami Technicien'
      },
      raison
    };
    
    demande.historique.push(nouvelHistorique);
    
    return of(demande);
  }

  // Obtenir les statistiques
  getStatistiques(): Observable<any> {
    const total = this.demandes.length;
    const enAttente = this.demandes.filter(d => 
      d.statut === StatutDemande.EN_ATTENTE || d.statut === StatutDemande.EN_COURS
    ).length;
    
    const resolues = this.demandes.filter(d => 
      d.statut === StatutDemande.TERMINEE || 
      d.statut === StatutDemande.APPROUVEE
    ).length;
    
    const tauxResolution = total > 0 ? ((resolues / total) * 100).toFixed(1) : '0';
    
    return of({
      total,
      enAttente,
      resolues,
      tauxResolution
    });
  }

  // Rechercher dans les demandes
  rechercherDemandes(term: string): Observable<Demande[]> {
    if (!term.trim()) {
      return this.getDemandes();
    }
    
    const termLower = term.toLowerCase();
    const resultats = this.demandes.filter(d =>
      d.numero.toLowerCase().includes(termLower) ||
      d.titre.toLowerCase().includes(termLower) ||
      d.description.toLowerCase().includes(termLower)
    );
    
    return of(resultats);
  }
}