import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Report } from '../report/interfaces/report';

@Injectable({
  providedIn: 'root',
})
export class ReportsListService {
  protected reportsList: Report[] = [];

  constructor() {
    this.reportsList = Array(5)
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

  getReports(): Report[] {
    return this.reportsList;
  }
}
