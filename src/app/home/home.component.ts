import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportsListComponent } from '../reportsList/reportsList.component';

@Component({
  selector: 'ucea-home',
  standalone: true,
  imports: [RouterModule, ReportsListComponent],
  template: ` <section>Welcome to Home page!</section>`,
  styles: `
    section {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 200px;
      font-size: 32px;
      font-weight: 700;
    }
  `,
})
export class HomeComponent {}
