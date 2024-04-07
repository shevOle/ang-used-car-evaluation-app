import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'ucea-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: IUser | null = null;
  profilePictureUrl: string = this.pictureUrl;

  constructor(private authService: AuthService) {
    this.user = this.authService.currentUserValue;
  }

  get currentUser() {
    return this.user;
  }

  get pictureUrl() {
    const pics = ['yoda', 'luke', 'chewie', 'leya', 'solo', 'mando'];
    const picIndex = Math.round(Math.random() * 5);
    return `../../assets/profile/${pics[picIndex]}.png`;
  }

  changePictuureUrl() {
    this.profilePictureUrl = this.pictureUrl;
  }
}
