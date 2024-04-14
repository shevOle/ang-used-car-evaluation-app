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
  actionMenuElements: NodeListOf<HTMLElement> | null = null;
  constructor(private reportsService: ReportService) {}

  async ngOnInit() {
    this.reports = await this.reportsService.getNewReports();
    document
      .querySelector('body')
      ?.addEventListener('click', () => this.hideActionMenu());
  }

  showActionMenu(id: string) {
    const el = document.getElementById(id);
    el?.classList.toggle('visible');
  }

  hideActionMenu() {
    // const elements = document.querySelectorAll('.report-table-action-menu');
    // elements?.forEach((i) => i.classList.remove('visible'));
  }

  approveReport(id: string) {
    console.log('approve', id);
  }

  rejectReport(id: string) {
    console.log('reject', id);
  }
}
