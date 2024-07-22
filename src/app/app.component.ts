import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { IUser } from './interfaces/user';
import { IAppNavigationLink } from './interfaces/navigation-link';
import { LoadingIndicatorComponent } from './common-components/loading-component';

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
    LoadingIndicatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentUser: Partial<IUser> | null = null;
  navLinks: IAppNavigationLink[] = this.constructNavComponents();

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((user) => {
      if (!user) this.router.navigate(['/login']);

      this.currentUser = user;
      this.navLinks = this.constructNavComponents(user?.isAdmin);
    });
  }

  constructNavComponents(isAdmin: boolean = false): IAppNavigationLink[] {
    return [
      {
        link: '/reports',
        isRendered: true,
        class: 'site-header-link',
        type: 'link',
        title: 'Reports',
        icon: 'article',
      },
      {
        link: '/estimate',
        isRendered: true,
        class: 'site-header-link',
        type: 'link',
        title: 'Estimate',
        icon: 'calculate',
      },
      {
        link: '/add-report',
        isRendered: true,
        class: 'site-header-link',
        type: 'link',
        title: 'Add report',
        icon: 'note_add',
      },
      {
        link: '/report-approval-queue',
        isRendered: isAdmin,
        class: 'site-header-link',
        type: 'link',
        title: 'Reports Approvals',
        icon: 'fact_check',
      },
      {
        link: '/my-reports',
        isRendered: true,
        class: 'site-header-link',
        type: 'link',
        title: 'My Reports',
        icon: 'view_list',
      },
      {
        link: '/profile',
        isRendered: true,
        class: 'site-header-link',
        type: 'link',
        title: 'Profile',
        icon: 'manage_accounts',
      },
    ];
  }

  async logOut() {
    await this.authService.logout();
  }
}
