import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { faker } from '@faker-js/faker';
import { Report } from '../interfaces/report';
import { IReportEstimateInput } from '../interfaces/reportEstimate-input';
import { IAddReport } from '../interfaces/addReport-input';

const formatReport = (report: Report): Report => ({
  ...report,
  year: new Date(report.year).getFullYear(),
});

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  protected reportsList: Report[] = [];
  protected rootUrl: string =
    'https://660801fea2a5dd477b13dc71.mockapi.io/api/v1';

  constructor(protected httpClient: HttpClient) {}

  getAllReports(): Promise<Report[]> {
    const reportsObservable = this.httpClient.request(
      'GET',
      `${this.rootUrl}/reports`
    ) as Observable<Report[]>;

    return firstValueFrom(reportsObservable).then((arr) =>
      arr.map(formatReport)
    );
  }

  getFilteredReports(
    make: string,
    model: string,
    year: string
  ): Promise<Report[]> {
    const params = new HttpParams({
      fromObject: {
        make,
        model,
      },
    });

    const reportsObservable = this.httpClient.get(`${this.rootUrl}/reports`, {
      params,
    }) as Observable<Report[]>;

    return firstValueFrom(reportsObservable).then((arr) =>
      arr.map(formatReport)
    );
  }

  getReportById(id: string): Promise<Report> {
    const reportObservable = this.httpClient.request(
      'GET',
      `${this.rootUrl}/reports/${id}`
    ) as Observable<Report>;

    return firstValueFrom(reportObservable).then(formatReport);
  }

  getEstimate(params: IReportEstimateInput) {
    return this.reportsList
      .filter((report) => {
        if (report.make.toLowerCase() !== params.make) return false;
        if (report.model.toLowerCase() !== params.model) return false;
        if (Math.abs(report.year - params.year) > 3) return false;
        if (Math.abs(report.lat - params.lat) > 5) return false;
        if (Math.abs(report.lng - params.lng) > 5) return false;

        return true;
      })
      .sort((a, b) => a.mileage - b.mileage);
  }

  addReport(params: IAddReport) {
    const id = faker.string.uuid();
    this.reportsList.push({
      id,
      ...params,
    });
  }
}
