import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { IUser } from './interfaces/user';

@Component({
  selector: 'ucea-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'UCEA';
  currentUser: Partial<IUser> | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    const navElement = document.querySelector('.site-header-nav');
    navElement?.classList.toggle('visible');
  }
}
