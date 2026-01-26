
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding: 40px 20px; text-align: center;">
      <h1 style="color: #333;">Bienvenue sur Tunisie Telecom</h1>
      <p style="font-size: 18px; color: #666; margin: 20px 0;">
        Gérez vos abonnements, consultez vos factures et créez des demandes de support.
      </p>
      
      <div style="margin-top: 40px;">
        <a routerLink="/dashboard-client" 
           style="padding: 15px 30px; background: #667eea; color: white; 
                  text-decoration: none; border-radius: 5px; margin: 10px;">
          Accéder au Dashboard
        </a>
        <a routerLink="/subscriptions" 
           style="padding: 15px 30px; background: #28a745; color: white; 
                  text-decoration: none; border-radius: 5px; margin: 10px;">
          Voir les offres
        </a>
      </div>
    </div>
  `
})
export class HomeComponent {}