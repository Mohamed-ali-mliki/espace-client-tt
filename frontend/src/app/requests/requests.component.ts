import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { Demande, TypeDemande, StatutDemande, PrioriteDemande, CreationDemande } from '../models/request.model';
import { AbonnementUtilisateur } from '../models/subscription.model';
import { OffreAbonnement } from '../models/offer.model';
import { RequestsService } from '../services/requests.service';
import { SubscriptionsService } from '../services/subscriptions.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  // Données
  demandes: Demande[] = [];
  demandesFiltrees: Demande[] = [];
  demandeSelectionnee: Demande | null = null;
  mesAbonnements: AbonnementUtilisateur[] = [];
  offresDisponibles: OffreAbonnement[] = [];
  
  // Formulaires
  demandeForm!: FormGroup;
  commentaireForm!: FormGroup;
  
  // Filtres
  filtreType: string = 'TOUS';
  filtreStatut: string = 'TOUS';
  filtrePriorite: string = 'TOUS';
  termeRecherche: string = '';
  
  // État
  isLoading = false;
  isSubmitting = false;
  showForm = false;
  showDetails = false;
  isAdmin = false; // À déterminer via un service d'authentification
  
  // Statistiques
  statistiques = {
    total: 0,
    enAttente: 0,
    enCours: 0,
    resolues: 0,
    tauxResolution: '0'
  };
  
  // Constantes pour les listes déroulantes
  typesDemande = Object.values(TypeDemande);
  statutsDemande = Object.values(StatutDemande);
  prioritesDemande = Object.values(PrioriteDemande);
  
  constructor(
    private requestsService: RequestsService,
    private subscriptionsService: SubscriptionsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.initialiserFormulaires();
    this.chargerDonnees();
    this.verifierParametresUrl();
  }
  
  // Initialisation des formulaires
  private initialiserFormulaires(): void {
    // Formulaire de création de demande
    this.demandeForm = this.fb.group({
      type: ['', Validators.required],
      titre: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      priorite: [PrioriteDemande.NORMALE, Validators.required],
      abonnementId: [''],
      offreId: ['']
    });
    
    // Formulaire de commentaire
    this.commentaireForm = this.fb.group({
      commentaire: ['', [Validators.required, Validators.minLength(3)]]
    });
    
    // Mise à jour des champs lors du changement de type
    this.demandeForm.get('type')?.valueChanges.subscribe(type => {
      this.onTypeChange(type);
    });
  }
  
  // Chargement des données
  private chargerDonnees(): void {
    this.isLoading = true;
    
    // Chargement des demandes
    this.requestsService.getDemandes().subscribe({
      next: (demandes) => {
        this.demandes = demandes;
        this.demandesFiltrees = [...demandes];
        this.isLoading = false;
        this.calculerStatistiques();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des demandes:', error);
        this.isLoading = false;
      }
    });
    
    // Chargement des abonnements (pour l'utilisateur normal)
    if (!this.isAdmin) {
      this.subscriptionsService.getMesAbonnements().subscribe({
        next: (abonnements) => {
          this.mesAbonnements = abonnements;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des abonnements:', error);
        }
      });
    }
    
    // Chargement des offres (pour les nouvelles souscriptions)
    this.subscriptionsService.getOffres().subscribe({
      next: (offres) => {
        this.offresDisponibles = offres;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des offres:', error);
      }
    });
  }
  
  // Vérification des paramètres URL
  private verifierParametresUrl(): void {
    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.filtreType = params['type'];
        this.appliquerFiltres();
      }
      if (params['offreId']) {
        this.showForm = true;
        this.demandeForm.patchValue({
          type: TypeDemande.NOUVELLE_SOUSCRIPTION,
          offreId: params['offreId']
        });
      }
    });
  }
  
  // Changement de type de demande
  onTypeChange(type: string): void {
    const abonnementControl = this.demandeForm.get('abonnementId');
    const offreControl = this.demandeForm.get('offreId');
    
    if (type === TypeDemande.NOUVELLE_SOUSCRIPTION) {
      offreControl?.setValidators(Validators.required);
      abonnementControl?.clearValidators();
    } else if (type === TypeDemande.MODIFICATION || type === TypeDemande.RESILIATION) {
      abonnementControl?.setValidators(Validators.required);
      offreControl?.clearValidators();
    } else {
      abonnementControl?.clearValidators();
      offreControl?.clearValidators();
    }
    
    abonnementControl?.updateValueAndValidity();
    offreControl?.updateValueAndValidity();
  }
  
  // Application des filtres
  appliquerFiltres(): void {
    let resultats = [...this.demandes];
    
    // Filtrage par type
    if (this.filtreType !== 'TOUS') {
      resultats = resultats.filter(d => d.type === this.filtreType);
    }
    
    // Filtrage par statut
    if (this.filtreStatut !== 'TOUS') {
      resultats = resultats.filter(d => d.statut === this.filtreStatut);
    }
    
    // Filtrage par priorité
    if (this.filtrePriorite !== 'TOUS') {
      resultats = resultats.filter(d => d.priorite === this.filtrePriorite);
    }
    
    // Recherche textuelle
    if (this.termeRecherche.trim()) {
      const terme = this.termeRecherche.toLowerCase();
      resultats = resultats.filter(d =>
        d.numero.toLowerCase().includes(terme) ||
        d.titre.toLowerCase().includes(terme) ||
        d.description.toLowerCase().includes(terme)
      );
    }
    
    this.demandesFiltrees = resultats;
  }
  
  // Réinitialisation des filtres
  reinitialiserFiltres(): void {
    this.filtreType = 'TOUS';
    this.filtreStatut = 'TOUS';
    this.filtrePriorite = 'TOUS';
    this.termeRecherche = '';
    this.appliquerFiltres();
  }
  
  // Affichage des détails de la demande
  afficherDetails(demande: Demande): void {
    this.demandeSelectionnee = demande;
    this.showDetails = true;
  }
  
  // Fermer les détails
  fermerDetails(): void {
    this.showDetails = false;
    this.demandeSelectionnee = null;
  }
  
  // Création d'une nouvelle demande
  soumettreDemande(): void {
    if (this.demandeForm.invalid) {
      this.marquerChampsCommeTouches();
      return;
    }
    
    this.isSubmitting = true;
    const demandeData: CreationDemande = this.demandeForm.value;
    
    this.requestsService.creerDemande(demandeData).subscribe({
      next: (nouvelleDemande) => {
        this.demandes.unshift(nouvelleDemande);
        this.demandesFiltrees.unshift(nouvelleDemande);
        this.demandeForm.reset({
          type: '',
          priorite: PrioriteDemande.NORMALE
        });
        this.showForm = false;
        this.isSubmitting = false;
        this.calculerStatistiques();
        
        // Affichage d'un message de succès
        this.afficherMessage('Demande créée avec succès!', 'success');
      },
      error: (error) => {
        console.error('Erreur lors de la création de la demande:', error);
        this.isSubmitting = false;
        this.afficherMessage('Erreur lors de la création de la demande', 'error');
      }
    });
  }
  
  // Ajout d'un commentaire
  ajouterCommentaire(): void {
    if (this.commentaireForm.invalid || !this.demandeSelectionnee) return;
    
    const commentaire = this.commentaireForm.get('commentaire')?.value;
    
    this.requestsService.ajouterCommentaire(
      this.demandeSelectionnee.id,
      commentaire,
      this.isAdmin // Si c'est un administrateur, le commentaire est interne
    ).subscribe({
      next: (nouveauCommentaire) => {
        if (this.demandeSelectionnee) {
          this.demandeSelectionnee.commentaires.push(nouveauCommentaire);
          this.demandeSelectionnee.dateModification = new Date();
        }
        
        this.commentaireForm.reset();
        this.afficherMessage('Commentaire ajouté avec succès', 'success');
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du commentaire:', error);
        this.afficherMessage('Erreur lors de l\'ajout du commentaire', 'error');
      }
    });
  }
  
  // Changement de statut de la demande (pour les administrateurs)
  changerStatut(demande: Demande, nouveauStatut: StatutDemande): void {
    if (confirm('Êtes-vous sûr de vouloir modifier le statut de cette demande ?')) {
      this.requestsService.mettreAJourStatut(demande.id, nouveauStatut).subscribe({
        next: (demandeMiseAJour) => {
          // Mise à jour des données locales
          const index = this.demandes.findIndex(d => d.id === demande.id);
          if (index !== -1) {
            this.demandes[index] = demandeMiseAJour;
          }
          
          if (this.demandeSelectionnee && this.demandeSelectionnee.id === demande.id) {
            this.demandeSelectionnee = demandeMiseAJour;
          }
          
          this.appliquerFiltres();
          this.calculerStatistiques();
          this.afficherMessage('Statut mis à jour avec succès', 'success');
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du statut:', error);
          this.afficherMessage('Erreur lors de la mise à jour du statut', 'error');
        }
      });
    }
  }
  
  // Calcul des statistiques
  private calculerStatistiques(): void {
    const total = this.demandes.length;
    const enAttente = this.demandes.filter(d => 
      d.statut === StatutDemande.EN_ATTENTE
    ).length;
    const enCours = this.demandes.filter(d => 
      d.statut === StatutDemande.EN_COURS
    ).length;
    const resolues = this.demandes.filter(d => 
      d.statut === StatutDemande.TERMINEE || 
      d.statut === StatutDemande.APPROUVEE
    ).length;
    
    const tauxResolution = total > 0 ? ((resolues / total) * 100).toFixed(1) : '0';
    
    this.statistiques = {
      total,
      enAttente,
      enCours,
      resolues,
      tauxResolution
    };
  }
  
  // Aide : affichage de message
  private afficherMessage(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    alert(`${type.toUpperCase()}: ${message}`);
  }
  
  // Aide : marquer les champs comme touchés
  private marquerChampsCommeTouches(): void {
    Object.keys(this.demandeForm.controls).forEach(key => {
      const control = this.demandeForm.get(key);
      control?.markAsTouched();
    });
  }
  
  // Aide : obtenir la couleur du statut
  getStatutColor(statut: StatutDemande): string {
    switch (statut) {
      case StatutDemande.EN_ATTENTE: return 'warning';
      case StatutDemande.EN_COURS: return 'info';
      case StatutDemande.APPROUVEE: return 'success';
      case StatutDemande.TERMINEE: return 'secondary';
      case StatutDemande.REJETEE: return 'danger';
      case StatutDemande.ANNULEE: return 'dark';
      default: return 'secondary';
    }
  }
  
  // Aide : obtenir l'icône du statut
  getStatutIcon(statut: StatutDemande): string {
    switch (statut) {
      case StatutDemande.EN_ATTENTE: return 'fas fa-clock';
      case StatutDemande.EN_COURS: return 'fas fa-spinner fa-spin';
      case StatutDemande.APPROUVEE: return 'fas fa-check-circle';
      case StatutDemande.TERMINEE: return 'fas fa-flag-checkered';
      case StatutDemande.REJETEE: return 'fas fa-times-circle';
      case StatutDemande.ANNULEE: return 'fas fa-ban';
      default: return 'fas fa-question-circle';
    }
  }
  
  // Aide : obtenir la couleur de la priorité
  getPrioriteColor(priorite: PrioriteDemande): string {
    switch (priorite) {
      case PrioriteDemande.BASSE: return 'success';
      case PrioriteDemande.NORMALE: return 'info';
      case PrioriteDemande.HAUTE: return 'warning';
      case PrioriteDemande.URGENTE: return 'danger';
      default: return 'secondary';
    }
  }
  
  // Aide : formater la date
  formaterDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Aide : calculer la durée de la demande
  calculerDuree(demande: Demande): string {
    const dateCreation = new Date(demande.dateCreation);
    const dateActuelle = new Date();
    const diffMs = dateActuelle.getTime() - dateCreation.getTime();
    const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffJours === 0) return 'Aujourd\'hui';
    if (diffJours === 1) return 'Hier';
    if (diffJours < 7) return `Il y a ${diffJours} jours`;
    if (diffJours < 30) return `Il y a ${Math.floor(diffJours / 7)} semaines`;
    return `Il y a ${Math.floor(diffJours / 30)} mois`;
  }
  
  // Exportation des demandes (pour les administrateurs)
  exporterDemandes(format: 'csv' | 'pdf' = 'csv'): void {
    this.afficherMessage(`Exportation en ${format.toUpperCase()} démarrée`, 'info');
  }
}