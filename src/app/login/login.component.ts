import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../services/auth.service';
import { FormCard } from '../common-components/form-card';

type FormControlFieldName = 'email' | 'password';

@Component({
  selector: 'ucea-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormCard,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login() {
    this.authService.loginUser({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    });

    this.loginForm.reset();
  }

  checkFormField(fieldName: FormControlFieldName, error: string): boolean {
    return (
      this[fieldName].invalid &&
      this[fieldName].touched &&
      this[fieldName].dirty &&
      this[fieldName].errors?.[error]
    );
  }
}
