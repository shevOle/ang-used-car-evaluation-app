import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  logOut() {
    console.log('clicked');
  }

  toggleMenu() {
    const navElement = document.querySelector('.site-header-nav');
    navElement?.classList.toggle('visible');
  }
}
