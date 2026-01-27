import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  currentYear = new Date().getFullYear();

  // Logo blanc (spécial footer)
  logoUrl = 'assets/image.png';


  contact = {
    phone: '1298',
    email: 'support@telecom.tn'
  };

  navigationLinks = [
    { label: 'Accueil', path: '/home' },
    { label: 'Abonnements', path: '/subscriptions' },
    { label: 'Demandes', path: '/requests' },
    { label: 'Tableau de bord', path: '/dashboard-client' }
  ];

  supportLinks = [
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Assistance', path: '/support' },
    { label: 'Couverture réseau', path: '/coverage' }
  ];

}
