import { Component } from '@angular/core';
import { ReportsListComponent } from '../reportsList/reportsList.component';

@Component({
  selector: 'ucea-home',
  standalone: true,
  imports: [ReportsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
