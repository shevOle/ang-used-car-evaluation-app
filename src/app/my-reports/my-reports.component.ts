import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ReportService } from '../services/reports.service';
import { AuthService } from '../services/auth.service';
import { Report } from '../interfaces/report';
import { IUser } from '../interfaces/user';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'ucea-my-reports',
  standalone: true,
  imports: [CommonModule, ReportComponent, RouterModule],
  templateUrl: './my-reports.component.html',
  styleUrl: './my-reports.component.scss',
})
export class MyReportsComponent {
  user: IUser | null = null;
  reports!: Observable<Report[]>;
  constructor(
    private authService: AuthService,
    private reportsService: ReportService
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }
  ngAfterViewInit() {
    this.reports = this.reportsService.getOwnReports();
  }
  // getMyReports(options: { make?: string; model?: string; year?: string }) {
  //   return firstValueFrom(
  //     this.reportsService.getReports({
  //       ...options,
  //       submittedByUserId: this.user?.id,
  //     })
  //   );
  // }
}
