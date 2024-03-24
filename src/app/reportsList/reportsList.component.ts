import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../services/reports.service';
import { Report } from '../interfaces/report';
import { ReportComponent } from '../report/report.component';
import { minProductionYear } from '../helpers/constants';

@Component({
  selector: 'ucea-reportsList',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ReportComponent],
  templateUrl: './reportsList.component.html',
  styleUrl: './reportsList.component.scss',
})
export class ReportsListComponent {
  protected reportsList: Report[] = [];
  protected reportsListService: ReportService = inject(ReportService);
  filterForm = new FormGroup({
    make: new FormControl('', { nonNullable: true }),
    model: new FormControl('', { nonNullable: true }),
    year: new FormControl<number | null>(null),
  });

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

  applyFilter() {
    this.reportsList = this.reportsListService.getReports({
      make: this.filterForm.value.make,
      model: this.filterForm.value.model,
      year: this.filterForm.value.year?.toString(),
    });
  }

  resetFilter() {
    this.filterForm.reset();
    this.applyFilter();
  }
}
