import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Report } from '../interfaces/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  protected reportsList: Report[] = [];

  constructor() {
    this.reportsList = Array(20)
      .fill(null)
      .map(() => ({
        id: faker.string.uuid(),
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        mileage: faker.number.int({ min: 0, max: 1000000 }),
        year: faker.number.int({ max: new Date().getFullYear(), min: 1990 }),
        price: faker.number.int({ min: 0, max: 1000000 }),
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
        description: faker.commerce.productDescription(),
      }));
  }

  getReports(): Report[] {
    return this.reportsList;
  }

  getReportById(id: string): Report | undefined {
    return this.reportsList.find((report) => report.id === id);
  }
}
