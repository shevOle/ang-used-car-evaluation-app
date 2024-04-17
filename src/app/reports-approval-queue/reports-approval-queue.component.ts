import { Component, ViewChild } from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  TitleCasePipe,
  DecimalPipe,
} from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
    MatPaginatorModule,
  ],
  templateUrl: './reports-approval-queue.component.html',
  styleUrl: './reports-approval-queue.component.scss',
})
export class ReportsApprovalQueueComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  reportsData: Report[] = [];
  dataSource = new MatTableDataSource<Report>(this.reportsData);
  columns: string[] = [
    'maker-col',
    'model-col',
    'price-col',
    'mileage-col',
    'status-col',
    'action-col',
  ];

  constructor(private reportsService: ReportService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
