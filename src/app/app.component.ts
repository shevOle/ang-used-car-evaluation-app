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
  navComponents = [
    {
      link: '/reports',
      isRendered: true,
      class: 'site-header-link',
      type: 'link',
      click: this.closeBurgerMenu.bind(this),
      title: 'Reports',
    },
    {
      link: '/estimate',
      isRendered: true,
      class: 'site-header-link',
      type: 'link',
      click: this.closeBurgerMenu.bind(this),
      title: 'Estimate',
    },
    {
      link: '/add-report',
      isRendered: true,
      class: 'site-header-link',
      type: 'link',
      click: this.closeBurgerMenu.bind(this),
      title: 'Add report',
    },
    {
      link: '/report-approval-queue',
      isRendered: this.currentUser?.isAdmin,
      class: 'site-header-link',
      type: 'link',
      click: this.closeBurgerMenu.bind(this),
      title: 'Reports Approvals',
    },
    {
      link: '/profile',
      isRendered: true,
      class: 'site-header-link',
      type: 'link',
      click: this.closeBurgerMenu.bind(this),
      title: 'Profile',
    },
    {
      link: '',
      isRendered: true,
      class: 'button-default button-logout',
      type: 'button',
      click: this.logOut.bind(this),
      title: 'Logout button',
    },
    {
      link: '',
      isRendered: true,
      class: 'button-default button-close-menu',
      type: 'button',
      click: this.closeBurgerMenu.bind(this),
      title: 'Close menu',
    },
  ];

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
