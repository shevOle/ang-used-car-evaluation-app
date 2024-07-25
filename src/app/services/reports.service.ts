import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Report } from '../interfaces/report';
import { IReportEstimateInput } from '../interfaces/reportEstimate-input';
import { IAddReport } from '../interfaces/addReport-input';
import { apiUrl } from '../helpers/constants';
import { LoadingService } from './loading.service';

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
    private authService: AuthService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {}

  getAllReports(): Promise<Report[]> {
    try {
      this.loadingService.loadingOn();
      const reportsObservable = this.httpClient.get(this.url, {
        withCredentials: true,
      }) as Observable<Report[]>;

      return firstValueFrom(reportsObservable);
    } finally {
      this.loadingService.loadingOff();
    }
  }

  getOwnReports(): Observable<Report[]> {
    try {
      this.loadingService.loadingOn();
      return this.httpClient.get(`${this.url}/own`, {
        withCredentials: true,
      }) as Observable<Report[]>;
    } finally {
      this.loadingService.loadingOff();
    }
  }

  getNewReports(): Promise<Report[]> {
    try {
      this.loadingService.loadingOn();
      const params = new HttpParams({ fromObject: { status: 'new' } });
      const obsservable = this.httpClient.get(this.url, {
        params,
      }) as Observable<Report[]>;
      return firstValueFrom(obsservable);
    } finally {
      this.loadingService.loadingOff();
    }
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
    try {
      this.loadingService.loadingOn();
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
    } finally {
      this.loadingService.loadingOff();
    }
  }

  getFilteredReports(options: {
    make?: string;
    model?: string;
    year?: string;
  }): Promise<Report[]> {
    try {
      this.loadingService.loadingOn();
      const fromObject = omitBy(options, isEmpty);

      const params = new HttpParams({ fromObject });

      const reportsObservable = this.httpClient.get(this.url, {
        params,
        withCredentials: true,
      }) as Observable<Report[]>;

      return firstValueFrom(reportsObservable);
    } finally {
      this.loadingService.loadingOff();
    }
  }

  getReportById(id: string): Promise<Report> {
    try {
      this.loadingService.loadingOn();
      const reportObservable = this.httpClient.get(`${this.url}/${id}`, {
        withCredentials: true,
      }) as Observable<Report>;

      return firstValueFrom(reportObservable);
    } finally {
      this.loadingService.loadingOff();
    }
  }

  getEstimate(input: IReportEstimateInput) {
    try {
      this.loadingService.loadingOn();
      const params = new HttpParams({ fromObject: { ...input } });
      const reportObservable = this.httpClient.get(`${this.url}/estimate`, {
        params,
        withCredentials: true,
      }) as Observable<{ reports: Report[]; averagePrice: number }>;

      return firstValueFrom(reportObservable);
    } finally {
      this.loadingService.loadingOff();
    }
  }

  async addReport(params: IAddReport) {
    try {
      this.loadingService.loadingOn();
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

      const result = await firstValueFrom(observable);
      this.toastr.success('Report was successfully submitted!');

      return result;
    } finally {
      this.loadingService.loadingOff();
    }
  }

  async approveReport(id: string) {
    try {
      this.loadingService.loadingOn();
      const result = await firstValueFrom(
        this.httpClient.patch(
          `${this.url}/${id}`,
          { status: 'approved' },
          { withCredentials: true, observe: 'response', responseType: 'text' }
        )
      );

      this.toastr.success('Report was successfully approved!');

      return result;
    } finally {
      this.loadingService.loadingOff();
    }
  }

  async rejectReport(id: string) {
    try {
      this.loadingService.loadingOn();
      const result = await firstValueFrom(
        this.httpClient.patch(
          `${this.url}/${id}`,
          { status: 'rejected' },
          { withCredentials: true, observe: 'response', responseType: 'text' }
        )
      );

      this.toastr.success('Report was successfully rejected!');
      return result;
    } finally {
      this.loadingService.loadingOff();
    }
  }
}
