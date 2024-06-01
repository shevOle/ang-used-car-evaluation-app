import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
import { AuthService } from './auth.service';
import { Report } from '../interfaces/report';
import { IReportEstimateInput } from '../interfaces/reportEstimate-input';
import { IAddReport } from '../interfaces/addReport-input';
import { apiUrl } from '../helpers/constants';

interface IPaginationOptions {
  page?: number;
  perPage?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  protected reportsList: Report[] = [];
  protected url: string = `${apiUrl}/reports`;
  constructor(
    protected httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getAllReports(): Promise<Report[]> {
    const reportsObservable = this.httpClient.get(this.url, {
      withCredentials: true,
    }) as Observable<Report[]>;

    return firstValueFrom(reportsObservable);
  }

  getNewReports(): Promise<Report[]> {
    const params = new HttpParams({ fromObject: { status: 'new' } });
    const obsservable = this.httpClient.get(this.url, { params }) as Observable<
      Report[]
    >;
    return firstValueFrom(obsservable);
  }

  getReports(options: Partial<Report>): Observable<Report[]>;
  getReports(
    options: Partial<Report>,
    pagination: IPaginationOptions
  ): Observable<{ results: Report[]; count: number }>;
  getReports(
    options: Partial<Report>,
    pagination?: IPaginationOptions
  ): Observable<Report[] | { results: Report[]; count: number }> {
    const params = new HttpParams({
      fromObject: { ...options, ...pagination },
    });

    if (!pagination)
      return this.httpClient.get(this.url, {
        params,
        withCredentials: true,
      }) as Observable<Report[]>;

    return this.httpClient.get(this.url, {
      params,
      withCredentials: true,
    }) as Observable<{ results: Report[]; count: number }>;
  }

  getFilteredReports(options: {
    make?: string;
    model?: string;
    year?: string;
  }): Promise<Report[]> {
    const fromObject = omitBy(options, isEmpty);

    const params = new HttpParams({ fromObject });

    const reportsObservable = this.httpClient.get(this.url, {
      params,
      withCredentials: true,
    }) as Observable<Report[]>;

    return firstValueFrom(reportsObservable);
  }

  getReportById(id: string): Promise<Report> {
    const reportObservable = this.httpClient.get(`${this.url}/${id}`, {
      withCredentials: true,
    }) as Observable<Report>;

    return firstValueFrom(reportObservable);
  }

  async getEstimate(input: IReportEstimateInput) {
    const params = new HttpParams({ fromObject: { ...input } });
    const reportObservable = this.httpClient.get(`${this.url}/estimate`, {
      params,
      withCredentials: true,
    }) as Observable<{ reports: Report[]; averagePrice: number }>;

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
    const userId = this.authService.currentUserValue?.id;
    const body = {
      ...params,
      status: 'new',
      submittedByUserId: userId,
    };
    const observable = this.httpClient.post(this.url, body, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text',
    });
    return firstValueFrom(observable);
  }

  approveReport(id: string) {
    return this.httpClient.put(`${this.url}/${id}`, { status: 'approved' });
  }

  rejectReport(id: string) {
    return this.httpClient.put(`${this.url}/${id}`, { status: 'rejected' });
  }
}
