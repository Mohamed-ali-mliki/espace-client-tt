import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,        // Nécessaire pour *ngIf, *ngFor, etc.
    ReactiveFormsModule, // Nécessaire pour [formGroup], formControlName
    RouterModule         // Nécessaire pour routerLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  private utilisateursTest = {
    'client@tunisietelecom.tn': {
      password: 'password',
      role: 'client',
      nom: 'Client Utilisateur'
    },
    'admin@tunisietelecom.tn': {
      password: 'password',
      role: 'admin',
      nom: 'Administrateur'
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password } = this.loginForm.value;

    setTimeout(() => {
      if (this.utilisateursTest[email as keyof typeof this.utilisateursTest]) {
        const utilisateur = this.utilisateursTest[email as keyof typeof this.utilisateursTest];
        
        if (utilisateur.password === password) {
          this.successMessage = `Connexion réussie! Bienvenue ${utilisateur.nom}`;
          
          setTimeout(() => {
            if (utilisateur.role === 'admin') {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/client-dashboard']);
            }
          }, 1500);
        } else {
          this.errorMessage = 'Mot de passe incorrect';
        }
      } else {
        this.errorMessage = 'Email non reconnu. Veuillez réessayer.';
      }
      
      this.isLoading = false;
    }, 1000);
  }

  onReset(): void {
    this.loginForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}