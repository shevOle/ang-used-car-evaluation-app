import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FormCard } from '../common-components/form-card';
import { CommonButton } from '../common-components/button';
import { PictureChooserComponent } from '../common-components/profile-picture-chooser';
import { BaseFieldWithError } from '../common-components/form-field-with-error';
import { IError } from '../interfaces/validation-error';

@Component({
  selector: 'ucea-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormCard,
    MatInputModule,
    MatFormFieldModule,
    CommonButton,
    PictureChooserComponent,
    BaseFieldWithError,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  authService: AuthService = inject(AuthService);
  signUpForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    picture: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  errors: { [key: string]: IError[] } = {
    email: [
      { errorType: 'required', message: 'Email is required' },
      { errorType: 'email', message: 'Please, provide a valid email' },
    ],

    password: [
      {
        errorType: 'minlength',
        message: 'Minimum 3 symbols required',
      },
      { errorType: 'required', message: 'Password is required' },
    ],
  };

  async signUp() {
    const email = this.signUpForm.value.email!;
    const password = this.signUpForm.value.password!;
    const picture = this.signUpForm.value.picture!;

    await firstValueFrom(
      this.authService.signUp({
        email,
        password,
        profilePicture: picture,
      })
    );

    this.signUpForm.reset();

    this.authService.loginUser({ email, password });
  }
}
