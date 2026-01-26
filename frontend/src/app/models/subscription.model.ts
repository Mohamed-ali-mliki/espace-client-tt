export interface AbonnementUtilisateur {
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