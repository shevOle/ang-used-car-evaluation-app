import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FormCard } from '../common-components/form-card';

type FormControlFieldName = 'email' | 'password';

@Component({
  selector: 'ucea-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormCard],
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
  });
  profilePictures = [
    { url: '../assets/profile/yoda.png', name: 'yoda' },
    { url: '../assets/profile/luke.png', name: 'luke' },
    { url: '../assets/profile/chewie.png', name: 'chewie' },
    { url: '../assets/profile/leya.png', name: 'leya' },
    { url: '../assets/profile/solo.png', name: 'solo' },
    { url: '../assets/profile/mando.png', name: 'mando' },
  ];
  chosenPictureIndex = 0;

  get picture() {
    return this.profilePictures[this.chosenPictureIndex];
  }

  get email() {
    return this.signUpForm.get('email')!;
  }

  get password() {
    return this.signUpForm.get('password')!;
  }

  scrollImagesBackwards() {
    if (this.chosenPictureIndex === 0) {
      return (this.chosenPictureIndex = this.profilePictures.length - 1);
    }

    return --this.chosenPictureIndex;
  }

  scrollImagesForward() {
    if (this.chosenPictureIndex === this.profilePictures.length - 1) {
      return (this.chosenPictureIndex = 0);
    }

    return ++this.chosenPictureIndex;
  }

  async signUp() {
    const email = this.signUpForm.value.email!;
    const password = this.signUpForm.value.password!;

    await firstValueFrom(
      this.authService.signUp({
        email,
        password,
        profilePicture: this.profilePictures[this.chosenPictureIndex].url,
      })
    );

    this.signUpForm.reset();

    this.authService.loginUser({ email, password });
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
