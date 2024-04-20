import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReportService } from '../services/reports.service';
import { ReportComponent } from '../report/report.component';
import { CommonButton } from '../common-components/button';
import { Report } from '../interfaces/report';

@Component({
  selector: 'ucea-report-estimate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportComponent,
    CurrencyPipe,
    CommonButton,
  ],
  templateUrl: './report-estimate.component.html',
  styleUrl: './report-estimate.component.scss',
})
export class ReportEstimateComponent {
  reportsService: ReportService = inject(ReportService);
  estimateForm = new FormGroup({
    make: new FormControl('', { validators: [Validators.required] }),
    model: new FormControl('', { validators: [Validators.required] }),
    year: new FormControl(1990, {
      validators: [
        Validators.required,
        Validators.min(1990),
        Validators.max(this.currentYear),
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
  $similarReports!: Promise<Report[]>;
  estimatePrice: number = 0;

  get make() {
    return this.estimateForm.get('make')!;
  }

  get model() {
    return this.estimateForm.get('model')!;
  }

  get year() {
    return this.estimateForm.get('year')!;
  }

  get lat() {
    return this.estimateForm.get('lat')!;
  }

  get lng() {
    return this.estimateForm.get('lng')!;
  }

  get currentYear() {
    return new Date().getFullYear();
  }

  submitEstimateForm() {
    this.$similarReports = this.reportsService
      .getEstimate({
        make: this.estimateForm.value.make!.toLowerCase(),
        model: this.estimateForm.value.model!.toLowerCase(),
        year: this.estimateForm.value.year!,
        lat: this.estimateForm.value.lat!,
        lng: this.estimateForm.value.lng!,
      })
      .then((reports) => {
        this.estimatePrice =
          reports.reduce((sum, { price }) => price + sum, 0) / reports.length;

        return reports;
      });
  }
}
