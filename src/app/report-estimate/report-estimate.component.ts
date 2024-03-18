import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReportService } from '../services/reports.service';
import { ReportComponent } from '../report/report.component';
import { Report } from '../interfaces/report';
import { formatMoney } from '../helpers/formatMoney';

@Component({
  selector: 'ucea-report-estimate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReportComponent],
  templateUrl: './report-estimate.component.html',
  styleUrl: './report-estimate.component.scss',
})
export class ReportEstimateComponent {
  reportsService: ReportService = inject(ReportService);
  estimateForm = new FormGroup({
    make: new FormControl('', { validators: [Validators.requiredTrue] }),
    model: new FormControl('', { validators: [Validators.requiredTrue] }),
    year: new FormControl(1990, {
      validators: [
        Validators.required,
        Validators.min(1990),
        Validators.max(new Date().getFullYear()),
      ],
    }),
    lat: new FormControl(0, {
      validators: [
        Validators.required,
        Validators.min(-90),
        Validators.max(90),
      ],
    }),
    lng: new FormControl(0, {
      validators: [
        Validators.required,
        Validators.min(-180),
        Validators.max(180),
      ],
    }),
  });
  similarReports: Report[] = [];
  estimatePrice: string = '0';

  submitEstimateForm() {
    const reports = this.reportsService.getEstimate({
      make: this.estimateForm.value.make!.toLowerCase(),
      model: this.estimateForm.value.model!.toLowerCase(),
      year: this.estimateForm.value.year!,
      lat: this.estimateForm.value.lat!,
      lng: this.estimateForm.value.lng!,
    });
    console.log('reports', reports);

    if (reports.length) {
      this.similarReports = reports;
      this.estimatePrice = formatMoney.format(
        reports.reduce((sum, { price }) => price + sum, 0) / reports.length
      );
    }
  }
}
