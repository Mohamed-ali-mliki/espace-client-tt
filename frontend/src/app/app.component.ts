import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  template: `
    <!-- Navbar toujours visible -->
    <app-navbar></app-navbar>
    
    <!-- Contenu principal -->
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    
    <!-- Footer visible seulement sur certaines pages -->
    <app-footer *ngIf="showFooter()"></app-footer>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 120px); /* Hauteur minimale pour pousser le footer vers le bas */
    }
  `]
})
export class AppComponent {
  currentRoute: string = '';
  
  constructor(private router: Router) {
    // Surveillance des changements de route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }
  
  // Méthode pour déterminer où afficher le footer
  showFooter(): boolean {
    const pagesWithFooter = ['/home', '/subscriptions', '/requests'];
    return pagesWithFooter.includes(this.currentRoute);
  }
}