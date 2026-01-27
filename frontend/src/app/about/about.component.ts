
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 40px; max-width: 800px; margin: 0 auto;">
      <h1>À propos de Tunisie Telecom</h1>
      <p>Page à propos en construction...</p>
    </div>
  `
})
export class AboutComponent {}
