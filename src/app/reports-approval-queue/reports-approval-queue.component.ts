import { Component, ViewChild } from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  TitleCasePipe,
  DecimalPipe,
} from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { of as observableOf, merge } from 'rxjs';
import { pickBy, isEmpty } from 'lodash';
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
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
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
  filterForm = new FormGroup({
    status: new FormControl(''),
    make: new FormControl(''),
    model: new FormControl(''),
  });

  constructor(private reportsService: ReportService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    merge(this.paginator.page, this.filterForm.statusChanges)
      .pipe(
        startWith([]),
        switchMap(() => {
          const filters = pickBy(this.filterForm.value, (v) => !isEmpty(v));

          return this.reportsService!.getReports(filters, {
            page: this.paginator.pageIndex,
            perPage: this.paginator.pageSize,
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

          this.dataLength = data.count;
          return data.results;
        })
      )
      .subscribe((data) => (this.reportsData = data));
  }

  approveReport(id: string) {
    this.reportsService.approveReport(id).subscribe(() => {
      this.paginator.page.emit({
        pageIndex: 0,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length,
      });
    });
  }

  rejectReport(id: string) {
    this.reportsService.rejectReport(id).subscribe(() => {
      this.paginator.page.emit({
        pageIndex: 0,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length,
      });
    });
  }
}
