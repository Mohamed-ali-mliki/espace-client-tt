// Types de demandes
export enum TypeDemande {
  NOUVELLE_SOUSCRIPTION = 'NOUVELLE_SOUSCRIPTION',
  MODIFICATION = 'MODIFICATION',
  RESILIATION = 'RESILIATION',
  REINITIALISATION = 'REINITIALISATION',
  SUPPORT = 'SUPPORT'
}

// États de la demande
export enum StatutDemande {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_COURS = 'EN_COURS',
  APPROUVEE = 'APPROUVEE',
  REJETEE = 'REJETEE',
  TERMINEE = 'TERMINEE',
  ANNULEE = 'ANNULEE'
}

// Priorité de la demande
export enum PrioriteDemande {
  BASSE = 'BASSE',
  NORMALE = 'NORMALE',
  HAUTE = 'HAUTE',
  URGENTE = 'URGENTE'
}

// Interface principale de la demande
export interface Demande {
  id: number;
  numero: string;
  type: TypeDemande;
  titre: string;
  description: string;
  statut: StatutDemande;
  priorite: PrioriteDemande;
  dateCreation: Date;
  dateModification: Date;
  dateResolution?: Date;
  createdBy: {
    id: number;
    nom: string;
    email: string;
    role: 'CLIENT' | 'ADMIN';
  };
  assigneA?: {
    id: number;
    nom: string;
    email: string;
  };
  abonnementId?: number;
  offreId?: number;
  piecesJointes?: PieceJointe[];
  commentaires: Commentaire[];
  historique: HistoriqueStatut[];
}

// Interface pour les pièces jointes
export interface PieceJointe {
  id: number;
  nom: string;
  url: string;
  type: string;
  taille: number;
  dateUpload: Date;
}

// Interface pour les commentaires
export interface Commentaire {
  id: number;
  contenu: string;
  date: Date;
  auteur: {
    id: number;
    nom: string;
    role: 'CLIENT' | 'ADMIN';
  };
  estInterne?: boolean;
}

// Interface pour l'historique des statuts
export interface HistoriqueStatut {
  id: number;
  ancienStatut: StatutDemande;
  nouveauStatut: StatutDemande;
  date: Date;
  modifiePar: {
    id: number;
    nom: string;
  };
  raison?: string;
}

// Interface pour la création d'une demande
export interface CreationDemande {
  type: TypeDemande;
  titre: string;
  description: string;
  priorite: PrioriteDemande;
  abonnementId?: number;
  offreId?: number;
  piecesJointes?: File[];
}