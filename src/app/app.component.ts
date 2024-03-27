import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'ucea-root',
  standalone: true,
  imports: [RouterModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'UCEA';
  router: Router = inject(Router);

  logOut() {
    this.router.navigate(['login']);
  }

  toggleMenu() {
    const navElement = document.querySelector('.site-header-nav');
    navElement?.classList.toggle('visible');
  }
}
