
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

export interface UserStats {
  totalAbonnements: number;
  abonnementsActifs: number;
  demandesEnCours: number;
  demandesResolues: number;
  depenseMensuelle: number;
  depenseTotale: number;
  dernierAcces: Date;
}