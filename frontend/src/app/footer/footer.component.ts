
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  // Données du footer
  companyInfo = {
    name: 'Tunisie Telecom',
    description: 'Leader des télécommunications en Tunisie',
    address: 'Centre Urbain Nord, 1082 Tunis',
    phone: '1298',
    email: 'support@tunistelecom.tn',
    website: 'www.tunistelecom.tn'
  };

  links = {
    about: { label: 'À propos', path: '/about' },
    contact: { label: 'Contact', path: '/contact' },
    assistance: { label: 'Assistance', path: '/assistance' },
    faq: { label: 'FAQ', path: '/faq' },
    terms: { label: 'Conditions d\'utilisation', path: '/terms' },
    privacy: { label: 'Politique de confidentialité', path: '/privacy' }
  };

  socialMedia = [
    { icon: 'fab fa-facebook-f', url: 'https://facebook.com/tunistelecom' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/tunistelecom' },
    { icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/company/tunisietelecom' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/tunistelecom' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com/tunistelecom' }
  ];
}
