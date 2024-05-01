import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { IUser } from './interfaces/user';

@Component({
  selector: 'ucea-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HomeComponent,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navElement: Element | null = null;
  currentUser: Partial<IUser> | null = null;
  navComponents = this.constructNavComponents();

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.navComponents = this.constructNavComponents(user?.isAdmin);
    });
  }

  constructNavComponents(isAdmin: boolean = false) {
    return [
      {
        link: '/reports',
        isRendered: true,
        class: 'site-header-link',
        type: 'link',
        click: this.closeBurgerMenu.bind(this),
        title: 'Reports',
        icon: 'article',
      },
      {
        link: '/estimate',
        isRendered: true,
        class: 'site-header-link',
        type: 'link',
        click: this.closeBurgerMenu.bind(this),
        title: 'Estimate',
        icon: 'calculate',
      },
      {
        link: '/add-report',
        isRendered: true,
        class: 'site-header-link',
        type: 'link',
        click: this.closeBurgerMenu.bind(this),
        title: 'Add report',
        icon: 'note_add',
      },
      {
        link: '/report-approval-queue',
        isRendered: isAdmin,
        class: 'site-header-link',
        type: 'link',
        click: this.closeBurgerMenu.bind(this),
        title: 'Reports Approvals',
        icon: 'fact_check',
      },
      {
        link: '/profile',
        isRendered: true,
        class: 'site-header-link',
        type: 'link',
        click: this.closeBurgerMenu.bind(this),
        title: 'Profile',
        icon: 'manage_accounts',
      },
      {
        link: '',
        isRendered: true,
        class: 'logout-button',
        type: 'button',
        click: this.logOut.bind(this),
        title: 'Logout',
        icon: 'logout',
      },
    ];
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
