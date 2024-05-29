import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReportService } from '../services/reports.service';
import { ReportComponent } from '../report/report.component';
import { CommonButton } from '../common-components/button';
import { FormCard } from '../common-components/form-card';
import { Report } from '../interfaces/report';
import { BaseFieldWithError } from '../common-components/form-field-with-error';
import { IError } from '../interfaces/validation-error';

@Component({
  selector: 'ucea-report-estimate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportComponent,
    CurrencyPipe,
    CommonButton,
    MatInputModule,
    MatFormFieldModule,
    FormCard,
    BaseFieldWithError,
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

  errors: { [key: string]: IError[] } = {
    make: [{ errorType: 'required', message: 'Manufacturer is required' }],
    model: [{ errorType: 'required', message: 'Model is required' }],
    year: [
      { errorType: 'required', message: 'Year is required' },
      { errorType: 'min', message: 'Minimum accepted year is 1990' },
      {
        errorType: 'max',
        message: `Maximum accepted year is ${this.currentYear}`,
      },
    ],
  };

  get currentYear() {
    return new Date().getFullYear();
  }

  submitEstimateForm() {
    this.$similarReports = this.reportsService
      .getEstimate({
        make: this.estimateForm.value.make!.toLowerCase(),
        model: this.estimateForm.value.model!.toLowerCase(),
        year: this.estimateForm.value.year!,
        mileage: 0,
        // lat: this.estimateForm.value.lat!,
        lat: 0,
        // lng: this.estimateForm.value.lng!,
        lng: 0,
      })
      .then(({ reports, averagePrice }) => {
        this.estimatePrice = averagePrice;

        return reports;
      });

    this.estimateForm.reset();
  }
}
