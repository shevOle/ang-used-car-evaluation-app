import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Report } from '../report/interfaces/report';
import { ReportsListService } from '../reportsList/reportsList.service';

@Component({
  selector: 'ucea-reportPage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportPage.component.html',
  styleUrl: './reportPage.component.scss',
})
export class ReportPageComponent {
  reportsService: ReportsListService = inject(ReportsListService);
  route: ActivatedRoute = inject(ActivatedRoute);
  report: Report | undefined;

  constructor() {
    const reportId: string = this.route.snapshot.params['id'];
    this.report = this.reportsService.getReportById(reportId);
  }
}
