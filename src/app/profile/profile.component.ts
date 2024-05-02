import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/user';
import { FormCard } from '../common-components/form-card';

@Component({
  selector: 'ucea-profile',
  standalone: true,
  imports: [CommonModule, FormCard, MatTooltipModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: IUser | null = null;

  constructor(private authService: AuthService) {
    this.user = this.authService.currentUserValue;
  }

  get currentUser() {
    return this.user;
  }

  get pictureUrl() {
    return this.user?.profilePicture;
  }
}
