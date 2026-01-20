import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  inscriptionForm: FormGroup;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.inscriptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) return;

    this.isLoading = true;
    setTimeout(() => {
      // Simuler enregistrement
      this.isLoading = false;
      this.successMessage = 'Compte créé avec succès!';
      this.errorMessage = '';
      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    }, 1000);
  }
}

