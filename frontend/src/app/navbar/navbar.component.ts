import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar', // Sélecteur du composant pour utilisation dans les templates
  standalone: true, // Composant autonome (standalone) pour Angular 19
  imports: [CommonModule, RouterModule], // Modules nécessaires pour les fonctionnalités
  templateUrl: './navbar.component.html', // Template HTML associé
  styleUrls: ['./navbar.component.css'] // Fichiers CSS associés
})
export class NavbarComponent {
  
  /**
   * Méthode appelée lorsque l'image est chargée avec succès
   * Utilisée pour le débogage et la confirmation du chargement
   */
  onImageLoad() {
    console.log('✅ Logo Tunisie Telecom chargé avec succès');
  }

  /**
   * Méthode de gestion des erreurs de chargement d'image
   * Fournit des alternatives en cas d'échec du chargement principal
   * @param event - Événement d'erreur déclenché par la balise <img>
   */
  onImageError(event: Event) {
    console.warn('⚠️ Tentative de chargement du logo alternatif...');
    const img = event.target as HTMLImageElement;
    
    // Premier fallback : version SVG du logo
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tunisie_Telecom_logo.svg/256px-Tunisie_Telecom_logo.svg.png';
    
    // Second fallback : image SVG de secours avec les initiales TT
    img.onerror = () => {
      console.warn('⚠️ Utilisation du fallback SVG...');
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzAwNjZCNyIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRUPC90ZXh0Pgo8L3N2Zz4K';
      img.alt = 'Logo Tunisie Telecom (version de secours)';
    };
  }
}