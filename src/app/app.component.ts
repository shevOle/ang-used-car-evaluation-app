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
  navElement: Element | null = null;
  currentUser: Partial<IUser> | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngAfterViewInit() {
    this.navElement = document.querySelector('.site-header-nav');
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openBurgerMenu() {
    this.navElement?.classList.add('visible');
  }

  closeBurgerMenu() {
    this.navElement?.classList.remove('visible');
  }
}
