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
import { IError } from '../interfaces/validation-error';
import { AuthService } from '../services/auth.service';
import { FormCard } from '../common-components/form-card';
import { CommonButton } from '../common-components/button';
import { BaseFieldWithError } from '../common-components/form-field-with-error';

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
    CommonButton,
    BaseFieldWithError,
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

  errors: { [key: string]: IError[] } = {
    email: [
      { errorType: 'required', message: 'Email is required' },
      { errorType: 'email', message: 'Please, provide a valid email' },
    ],

    password: [
      { errorType: 'required', message: 'Password is required' },
      {
        errorType: 'minlength',
        message: 'Minimum 3 symbols required',
      },
    ],
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.authService.loginUser({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    });

    this.loginForm.reset();
  }
}
