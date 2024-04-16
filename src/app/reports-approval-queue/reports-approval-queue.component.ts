import { Component } from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  TitleCasePipe,
  DecimalPipe,
} from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ReportService } from '../services/reports.service';
import { Report } from '../interfaces/report';

@Component({
  selector: 'ucea-reports-approval-queue',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    TitleCasePipe,
    DecimalPipe,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './reports-approval-queue.component.html',
  styleUrl: './reports-approval-queue.component.scss',
})
export class ReportsApprovalQueueComponent {
  reportsData: Report[] = [];
  columns: string[] = [
    'maker-col',
    'model-col',
    'price-col',
    'mileage-col',
    'status-col',
    'action-col',
  ];

  constructor(private reportsService: ReportService) {}

  async ngOnInit() {
    this.reportsData = await this.reportsService.getNewReports();
  }

  approveReport(id: string) {
    console.log('approve', id);
  }

  rejectReport(id: string) {
    console.log('reject', id);
  }
}
