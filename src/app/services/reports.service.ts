import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Report } from '../interfaces/report';
import { IReportEstimateInput } from '../interfaces/reportEstimate-input';

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

  getEstimate(params: IReportEstimateInput) {
    return this.reportsList
      .filter((report) => {
        if (report.make !== params.make) return false;
        if (report.model !== params.model) return false;
        if (Math.abs(report.year - params.year) > 3) return false;
        if (Math.abs(report.lat - params.lat) > 5) return false;
        if (Math.abs(report.lng - params.lng) > 5) return false;

        return true;
      })
      .sort((a, b) => a.mileage - b.mileage);
  }
}
