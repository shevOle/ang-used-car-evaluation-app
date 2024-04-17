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
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
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
  dataLength = 0;
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
    this.paginator.page;
    this.dataSource.paginator = this.paginator;

    merge(this.paginator.page, this.paginator.pageSize)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.reportsService!.getReports({
            page: this.paginator.pageIndex + 1,
            limit: this.paginator.pageSize,
          }).pipe(
            catchError((err) => {
              console.error(err);
              return observableOf(null);
            })
          );
        }),
        map((data) => {
          if (data === null) {
            return [];
          }

          this.dataLength = data.length;
          return data;
        })
      )
      .subscribe((data) => (this.reportsData = data));
  }

  approveReport(id: string) {
    console.log('approve', id);
  }

  rejectReport(id: string) {
    console.log('reject', id);
  }
}
