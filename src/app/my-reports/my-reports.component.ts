import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom, merge } from 'rxjs';
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

  estimateForm = new FormGroup({
    make: new FormControl('', { nonNullable: true }),
    model: new FormControl('', { nonNullable: true }),
    year: new FormControl('', { nonNullable: true }),
  });
  reports!: Promise<Report[]>;

  constructor(
    private authService: AuthService,
    private reportsService: ReportService
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
      this.reports = this.getMyReports({});
    });
  }

  ngAfterViewInit() {
    merge(this.estimateForm.statusChanges).subscribe(
      () =>
        (this.reports = this.getMyReports({
          make: this.estimateForm.value.make,
          model: this.estimateForm.value.model,
          year: this.estimateForm.value.year,
        }))
    );
  }

  getMyReports(options: { make?: string; model?: string; year?: string }) {
    return firstValueFrom(
      this.reportsService.getReports({
        ...options,
        submittedByUserId: this.user?.id,
      })
    );
  }
}
