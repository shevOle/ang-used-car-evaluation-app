import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Report } from '../interfaces/report';
import { IReportEstimateInput } from '../interfaces/reportEstimate-input';
import { IAddReport } from '../interfaces/addReport-input';
import { apiUrl } from '../helpers/constants';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  protected reportsList: Report[] = [];
  protected url: string = `${apiUrl}/reports`;
  constructor(protected httpClient: HttpClient) {}

  getAllReports(): Promise<Report[]> {
    const reportsObservable = this.httpClient.get(this.url) as Observable<
      Report[]
    >;

    return firstValueFrom(reportsObservable);
  }

  getNewReports(): Promise<Report[]> {
    const params = new HttpParams({ fromObject: { status: 'new' } });
    const obsservable = this.httpClient.get(this.url, { params }) as Observable<
      Report[]
    >;
    return firstValueFrom(obsservable);
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

    const reportsObservable = this.httpClient.get(this.url, {
      params,
    }) as Observable<Report[]>;

    return firstValueFrom(reportsObservable);
  }

  getReportById(id: string): Promise<Report> {
    const reportObservable = this.httpClient.get(
      `${this.url}/${id}`
    ) as Observable<Report>;

    return firstValueFrom(reportObservable);
  }

  getEstimate(input: IReportEstimateInput) {
    const params = new HttpParams({
      fromObject: {
        make: input.make,
        model: input.model,
      },
    });
    const reportObservable = this.httpClient.get(this.url, {
      params,
    }) as Observable<Report[]>;
    return firstValueFrom(reportObservable);
    // return this.reportsList
    //   .filter((report) => {
    //     if (report.make.toLowerCase() !== params.make) return false;
    //     if (report.model.toLowerCase() !== params.model) return false;
    //     if (Math.abs(report.year - params.year) > 3) return false;
    //     if (Math.abs(report.lat - params.lat) > 5) return false;
    //     if (Math.abs(report.lng - params.lng) > 5) return false;

    //     return true;
    //   })
    //   .sort((a, b) => a.mileage - b.mileage);
  }

  addReport(params: IAddReport) {
    const observable = this.httpClient.post(this.url, params);
    return firstValueFrom(observable);
  }
}
