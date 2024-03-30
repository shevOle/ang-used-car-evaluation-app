import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportService } from '../services/reports.service';
import { Report } from '../interfaces/report';
import { ReportComponent } from '../report/report.component';
import { minProductionYear } from '../helpers/constants';

@Component({
  selector: 'ucea-reportsList',
  standalone: true,
  imports: [CommonModule, RouterModule, ReportComponent],
  templateUrl: './reportsList.component.html',
  styleUrl: './reportsList.component.scss',
})
export class ReportsListComponent {
  protected reportsList: Report[] = [];
  protected reportsListService: ReportService = inject(ReportService);

  constructor() {
    this.reportsList = this.reportsListService.getReports();
  }

  get availableYears() {
    const yearLabels = [''];
    for (let i = minProductionYear; i <= new Date().getFullYear(); i += 1) {
      yearLabels.push(i.toString());
    }
    return yearLabels;
  }

  applyFilter(make: string, model: string, year: string) {
    this.reportsList = this.reportsListService.getReports({
      make,
      model,
      year,
    });
  }

  resetFilter(filtersList: (HTMLInputElement | HTMLSelectElement)[]) {
    filtersList.forEach((filter) => {
      filter.value = '';
    });
    this.applyFilter('', '', '');
  }
}
