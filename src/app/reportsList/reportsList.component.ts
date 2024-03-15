import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faker } from '@faker-js/faker';
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
  reportsList: Report[] = Array(5)
    .fill(null)
    .map(() => ({
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      mileage: faker.number.int({ min: 0, max: 1000000 }),
      year: faker.number.int({ max: new Date().getFullYear(), min: 1990 }),
      price: faker.number.int({ min: 0, max: 1000000 }),
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    }));
}
