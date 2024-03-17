import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../services/reportsList.service';
import { Report } from '../report/interfaces/report';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'ucea-reportsList',
  standalone: true,
  imports: [CommonModule, ReportComponent],
  templateUrl: './reportsList.component.html',
  styleUrl: './reportsList.component.scss',
})
export class ReportsListComponent {
  protected reportsList: Report[] = [];
  protected reportsListService: ReportService = inject(ReportService);

  constructor() {
    this.reportsList = this.reportsListService.getReports();
  }
}
