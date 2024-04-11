import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReportService } from '../services/reports.service';
import { Report } from '../interfaces/report';

@Component({
  selector: 'ucea-reports-approval-queue',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './reports-approval-queue.component.html',
  styleUrl: './reports-approval-queue.component.scss',
})
export class ReportsApprovalQueueComponent {
  reports: Report[] = [];
  constructor(private reportsService: ReportService) {}

  async ngOnInit() {
    this.reports = await this.reportsService.getNewReports();
  }
}
