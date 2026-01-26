
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { SubscriptionsService } from '../services/subscriptions.service';
import { RequestsService } from '../services/requests.service';
import { AuthService, User } from '../services/auth.service';

// Models
import { AbonnementUtilisateur } from '../models/subscription.model';
import { Demande, TypeDemande, StatutDemande, CreationDemande } from '../models/request.model';
import { UserStats } from '../models/user.model';

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {
  user: User | null = null;
  stats: UserStats = {
    totalAbonnements: 0,
    abonnementsActifs: 0,
    demandesEnCours: 0,
    demandesResolues: 0,
    depenseMensuelle: 0,
    depenseTotale: 0,
    dernierAcces: new Date()
  };
  
  abonnements: AbonnementUtilisateur[] = [];
  demandes: Demande[] = [];
  offres: any[] = [];
  
  filterStatut = 'TOUS';
  filterType = 'TOUS';
  currentPage = 1;
  itemsPerPage = 5;
  
  demandeForm: FormGroup;
  editProfilForm: FormGroup;
  editAbonnementForm: FormGroup;
  
  showDemandeModal = false;
  showProfilModal = false;
  showAbonnementModal = false;
  selectedDemande: Demande | null = null;
  selectedAbonnement: AbonnementUtilisateur | null = null;
  
  typesDemande = Object.values(TypeDemande);
  statutsDemande = Object.values(StatutDemande);
  
  constructor(
    private authService: AuthService,
    private subscriptionsService: SubscriptionsService,
    private requestsService: RequestsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.demandeForm = this.fb.group({
      type: ['', Validators.required],
      titre: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priorite: ['NORMALE'],
      abonnementId: [''],
      offreId: ['']
    });
    
    this.editProfilForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      adresse: [''],
      ville: [''],
      codePostal: ['']
    });
    
    this.editAbonnementForm = this.fb.group({
      type: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      dateRenouvellement: ['', Validators.required],
      statut: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.chargerDonnees();
  }
  
  chargerDonnees(): void {
    this.user = this.authService.getCurrentUser();
    
    this.subscriptionsService.getMesAbonnements().subscribe({
      next: (abonnements) => {
        this.abonnements = abonnements;
        this.calculerStatsAbonnements();
      },
      error: (error) => console.error('Erreur chargement abonnements:', error)
    });
    
    this.requestsService.getDemandes().subscribe({
      next: (demandes) => {
        this.demandes = demandes;
        this.calculerStatsDemandes();
      },
      error: (error) => console.error('Erreur chargement demandes:', error)
    });
    
    this.subscriptionsService.getOffres().subscribe({
      next: (offres) => {
        this.offres = offres;
      },
      error: (error) => console.error('Erreur chargement offres:', error)
    });
  }
  
  calculerStatsAbonnements(): void {
    this.stats.totalAbonnements = this.abonnements.length;
    this.stats.abonnementsActifs = this.abonnements.filter(a => a.statut === 'ACTIF').length;
    this.stats.depenseMensuelle = this.abonnements
      .filter(a => a.statut === 'ACTIF')
      .reduce((sum, a) => sum + a.prix, 0);
    this.stats.depenseTotale = this.abonnements.reduce((sum, a) => sum + a.prix, 0);
  }
  
  calculerStatsDemandes(): void {
    this.stats.demandesEnCours = this.demandes.filter(d => 
      d.statut === StatutDemande.EN_ATTENTE || d.statut === StatutDemande.EN_COURS
    ).length;
    this.stats.demandesResolues = this.demandes.filter(d => 
      d.statut === StatutDemande.TERMINEE || d.statut === StatutDemande.APPROUVEE
    ).length;
  }
  
  creerDemande(): void {
    if (this.demandeForm.valid) {
      const nouvelleDemande: CreationDemande = this.demandeForm.value;
      
      this.requestsService.creerDemande(nouvelleDemande).subscribe({
        next: (demande) => {
          this.demandes.unshift(demande);
          this.calculerStatsDemandes();
          this.showDemandeModal = false;
          this.demandeForm.reset();
          alert('Demande créée avec succès!');
        },
        error: (error) => {
          console.error('Erreur création demande:', error);
          alert('Erreur lors de la création de la demande');
        }
      });
    }
  }
  
  supprimerDemande(demandeId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande?')) {
      this.demandes = this.demandes.filter(d => d.id !== demandeId);
      this.calculerStatsDemandes();
      alert('Demande supprimée avec succès!');
    }
  }
  
  modifierAbonnement(abonnement: AbonnementUtilisateur): void {
    this.selectedAbonnement = abonnement;
    this.editAbonnementForm.patchValue({
      type: abonnement.type,
      prix: abonnement.prix,
      dateRenouvellement: this.formatDateForInput(abonnement.dateRenouvellement),
      statut: abonnement.statut
    });
    this.showAbonnementModal = true;
  }
  
  mettreAJourAbonnement(): void {
    if (this.editAbonnementForm.valid && this.selectedAbonnement) {
      const index = this.abonnements.findIndex(a => a.id === this.selectedAbonnement!.id);
      if (index !== -1) {
        this.abonnements[index] = {
          ...this.abonnements[index],
          ...this.editAbonnementForm.value,
          dateRenouvellement: this.editAbonnementForm.value.dateRenouvellement
        };
        this.calculerStatsAbonnements();
        this.showAbonnementModal = false;
        alert('Abonnement mis à jour avec succès!');
      }
    }
  }
  
  resilierAbonnement(abonnementId: number): void {
    if (confirm('Êtes-vous sûr de vouloir résilier cet abonnement?')) {
      const index = this.abonnements.findIndex(a => a.id === abonnementId);
      if (index !== -1) {
        this.abonnements[index].statut = 'RESILIE';
        this.calculerStatsAbonnements();
        alert('Abonnement résilié avec succès!');
      }
    }
  }
  
  getStatutBadgeClass(statut: string): string {
    switch (statut) {
      case 'ACTIF': return 'badge-success';
      case 'EN_ATTENTE': return 'badge-warning';
      case 'RESILIE': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }
  
  getPrioriteBadgeClass(priorite: string): string {
    switch (priorite) {
      case 'HAUTE': return 'badge-danger';
      case 'NORMALE': return 'badge-warning';
      case 'BASSE': return 'badge-success';
      default: return 'badge-secondary';
    }
  }
  
  getTypeBadgeClass(type: string): string {
    switch (type) {
      case 'FIBRE': return 'badge-primary';
      case 'ADSL': return 'badge-info';
      case 'MOBILE': return 'badge-success';
      case 'FIXE': return 'badge-secondary';
      default: return 'badge-dark';
    }
  }
  
  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
  
  formatDateForInput(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }
  
  get demandesFiltrees(): Demande[] {
    let filtrees = this.demandes;
    
    if (this.filterStatut !== 'TOUS') {
      filtrees = filtrees.filter(d => d.statut === this.filterStatut);
    }
    
    if (this.filterType !== 'TOUS') {
      filtrees = filtrees.filter(d => d.type === this.filterType);
    }
    
    return filtrees;
  }
  
  get demandesPaginees(): Demande[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.demandesFiltrees.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  get totalPages(): number {
    return Math.ceil(this.demandesFiltrees.length / this.itemsPerPage);
  }
  
  changerPage(page: number): void {
    this.currentPage = page;
  }
  
  allerVersAbonnements(): void {
    this.router.navigate(['/subscriptions']);
  }
  
  allerVersDemandes(): void {
    this.router.navigate(['/requests']);
  }
  
  ouvrirModalDemande(): void {
    this.showDemandeModal = true;
  }
  
  fermerModalDemande(): void {
    this.showDemandeModal = false;
    this.demandeForm.reset();
  }
  
  ouvrirModalProfil(): void {
    if (this.user) {
      this.editProfilForm.patchValue(this.user);
      this.showProfilModal = true;
    }
  }
  
  fermerModalProfil(): void {
    this.showProfilModal = false;
  }
  
  sauvegarderProfil(): void {
    if (this.editProfilForm.valid && this.user) {
      this.user = { ...this.user, ...this.editProfilForm.value };
      alert('Profil mis à jour avec succès!');
      this.fermerModalProfil();
    }
  }
}