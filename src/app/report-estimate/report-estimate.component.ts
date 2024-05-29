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
  estimateReports!: Report[];
  estimatePrice: number = 0;
  estimateMake: string = '';
  estimateModel: string = '';
  estimateYear: number = 0;

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

  private setEstimates(options: {
    reports: Report[];
    averagePrice: number;
    make: string;
    model: string;
    year: number;
  }) {
    this.estimatePrice = options.averagePrice;
    this.estimateMake = options.make;
    this.estimateModel = options.model;
    this.estimateYear = options.year;
    this.estimateReports = options.reports;
  }

  private resetEstimates() {
    this.estimatePrice = 0;
    this.estimateMake = '';
    this.estimateModel = '';
    this.estimateYear = 0;
    this.estimateReports = [];
  }

  get currentYear() {
    return new Date().getFullYear();
  }

  async submitEstimateForm() {
    try {
      const make = this.estimateForm.value.make!.toLowerCase();
      const model = this.estimateForm.value.model!.toLowerCase();
      const year = this.estimateForm.value.year!;

      const { reports, averagePrice } = await this.reportsService.getEstimate({
        make,
        model,
        year,
        // TODO: add inputs for mileage, lat and lng
        mileage: 0,
        lat: 0,
        lng: 0,
      });

      this.setEstimates({ averagePrice, make, model, year, reports });
      this.estimateForm.reset();
    } catch (err) {
      console.error(err);
      this.resetEstimates();
    }
  }
}
