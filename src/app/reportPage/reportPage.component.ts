import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Report } from '../interfaces/report';
import { ReportService } from '../services/reports.service';
import { formatMoney } from '../helpers/formatMoney';

@Component({
  selector: 'ucea-reportPage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportPage.component.html',
  styleUrl: './reportPage.component.scss',
})
export class ReportPageComponent {
  reportsService: ReportService = inject(ReportService);
  route: ActivatedRoute = inject(ActivatedRoute);
  report: Report | undefined;

  constructor() {
    const reportId: string = this.route.snapshot.params['id'];
    this.report = this.reportsService.getReportById(reportId);

    if (this.report?.price) {
      this.report.price = formatMoney.format(this.report.price) as any;
    }
  }
}
