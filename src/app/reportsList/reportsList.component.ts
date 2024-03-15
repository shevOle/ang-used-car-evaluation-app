import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Report } from '../report/interfaces/report';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'ucea-reportsList',
  standalone: true,
  imports: [CommonModule, ReportComponent],
  templateUrl: './reportsList.component.html',
  styleUrl: './reportsList.component.scss',
})
export class ReportsListComponent {
  reportsList: Report[] = [
    {
      make: 'Toyota',
      model: 'Corolla',
      year: 2003,
      mileage: 100000,
      price: 3300,
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      year: 2000,
      mileage: 230400,
      price: 2500,
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      year: 2008,
      mileage: 85000,
      price: 5000,
    },
  ];
}
