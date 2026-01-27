
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AdminService, AdminStats, Client } from '../services/admin.service';
import { RequestsService } from '../services/requests.service';
import { SubscriptionsService } from '../services/subscriptions.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  stats: AdminStats = {
    totalClients: 0,
    totalAbonnements: 0,
    demandesEnCours: 0,
    revenuMensuel: 0,
    revenuAnnuel: 0,
    tauxConversion: 0,
    satisfaction: 0
  };
  
  clients: Client[] = [];
  demandesRecent: any[] = [];
  offres: any[] = [];
  
  // Filtres
  filterClientStatut = 'TOUS';
  filterDate = '7j'; // 7j, 30j, 90j
  
  // Pagination
  currentPageClients = 1;
  itemsPerPage = 10;
  
  // États UI
  showClientModal = false;
  showOffreModal = false;
  selectedClient: Client | null = null;
  
  // Graphiques (à implémenter avec Chart.js ou ngx-charts)
  chartData: any;
  
  constructor(
    private adminService: AdminService,
    private requestsService: RequestsService,
    private subscriptionsService: SubscriptionsService,
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.chargerDonnees();
  }
  
  chargerDonnees(): void {
    this.adminService.getStats().subscribe(stats => {
      this.stats = stats;
    });
    
    this.adminService.getClients().subscribe(clients => {
      this.clients = clients;
    });
    
    this.requestsService.getDemandes().subscribe(demandes => {
      this.demandesRecent = demandes.slice(0, 10);
    });
    
    this.subscriptionsService.getOffres().subscribe(offres => {
      this.offres = offres;
    });
  }
  
  // Méthodes CRUD pour les clients
  modifierClient(client: Client): void {
    this.selectedClient = client;
    this.showClientModal = true;
  }
  
  supprimerClient(clientId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      // Appel au service pour suppression
      this.clients = this.clients.filter(c => c.id !== clientId);
    }
  }
  
  bloquerClient(clientId: number): void {
    const client = this.clients.find(c => c.id === clientId);
    if (client) {
      client.statut = 'BLOQUE';
    }
  }
  
  // Méthodes CRUD pour les offres
  creerOffre(): void {
    this.showOffreModal = true;
  }
  
  // Navigation
  allerVersGestionClients(): void {
    this.router.navigate(['/admin/clients']);
  }
  
  allerVersGestionDemandes(): void {
    this.router.navigate(['/admin/demandes']);
  }
  
  // Utilitaires
  formatNombre(nombre: number): string {
    return nombre.toLocaleString('fr-FR');
  }
  
  formatMontant(montant: number): string {
    return `${montant.toLocaleString('fr-FR')} DT`;
  }
  
  get clientsFiltres(): Client[] {
    let filtres = this.clients;
    
    if (this.filterClientStatut !== 'TOUS') {
      filtres = filtres.filter(c => c.statut === this.filterClientStatut);
    }
    
    return filtres;
  }
  
  get clientsPagine(): Client[] {
    const start = (this.currentPageClients - 1) * this.itemsPerPage;
    return this.clientsFiltres.slice(start, start + this.itemsPerPage);
  }
}
