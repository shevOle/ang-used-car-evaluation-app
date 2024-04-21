import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReportService } from '../services/reports.service';
import { Report } from '../interfaces/report';
import { ReportComponent } from '../report/report.component';
import { minProductionYear } from '../helpers/constants';
import { CommonButton } from '../common-components/button';

@Component({
  selector: 'ucea-reportsList',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReportComponent,
    CommonButton,
  ],
  templateUrl: './reportsList.component.html',
  styleUrl: './reportsList.component.scss',
})
export class ReportsListComponent {
  protected $reports!: Promise<Report[]>;

  filterForm = new FormGroup({
    make: new FormControl('', { nonNullable: true }),
    model: new FormControl('', { nonNullable: true }),
    year: new FormControl('', { nonNullable: true }),
  });

  constructor(protected reportsService: ReportService) {}

  get availableYears() {
    const yearLabels = [];
    for (let i = minProductionYear; i <= new Date().getFullYear(); i += 1) {
      yearLabels.push(i.toString());
    }
    return yearLabels;
  }

  ngOnInit(): void {
    this.$reports = this.reportsService.getAllReports();
  }

  applyFilter() {
    const { make, model, year } = this.filterForm.value!;
    this.$reports = this.reportsService.getFilteredReports(
      make!,
      model!,
      year!
    );
  }

  resetFilter() {
    this.filterForm.reset();
    this.$reports = this.reportsService.getAllReports();
  }
}
