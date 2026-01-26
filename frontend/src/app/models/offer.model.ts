export interface OffreAbonnement {
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