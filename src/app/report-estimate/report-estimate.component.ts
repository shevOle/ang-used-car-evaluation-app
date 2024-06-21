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
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { ReportService } from '../services/reports.service';
import { ReportComponent } from '../report/report.component';
import { CommonButton } from '../common-components/button';
import { FormCard } from '../common-components/form-card';
import { Report } from '../interfaces/report';
import { BaseFieldWithError } from '../common-components/form-field-with-error';
import { IError } from '../interfaces/validation-error';

// TODO: add HTML inputs for mileage, lat and lng
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
    GoogleMap,
    MapMarker,
  ],
  templateUrl: './report-estimate.component.html',
  styleUrl: './report-estimate.component.scss',
})
export class ReportEstimateComponent {
  reportsService: ReportService = inject(ReportService);
  markerPosition: google.maps.LatLngLiteral | null = null;
  coordinatesError: string = '';
  estimateForm = new FormGroup({
    make: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    model: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    year: new FormControl(1990, {
      validators: [
        Validators.required,
        Validators.min(1990),
        Validators.max(this.currentYear),
      ],
      nonNullable: true,
    }),
    mileage: new FormControl(0, {
      validators: [
        Validators.required,
        Validators.min(1990),
        Validators.max(this.currentYear),
      ],
      nonNullable: true,
    }),
    lat: new FormControl<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(-90),
        Validators.max(90),
      ],
    }),
    lng: new FormControl<number | null>(null, {
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
      { errorType: 'required', message: 'Mileage is required' },
      { errorType: 'min', message: 'Minimum accepted mileage is 0' },
      {
        errorType: 'max',
        message: 'Maximum accepted mileage is 100000',
      },
    ],
    mileage: [
      { errorType: 'required', message: 'Mileage is required' },
      { errorType: 'min', message: 'Minimum accepted year is 1990' },
      {
        errorType: 'max',
        message: `Maximum accepted year is ${this.currentYear}`,
      },
    ],
    coordinates: [
      {
        errorType: 'required',
        message: 'Coordinates is required, please, choose location on map',
      },
      { errorType: 'min', message: 'Coordinates is invalid' },
      { errorType: 'max', message: `Coordinates is invalid` },
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
      const mileage = this.estimateForm.value.mileage!;
      const lat = this.estimateForm.value.lat!;
      const lng = this.estimateForm.value.lng!;

      const triggeredError = this.errors['coordinates'].find(
        (err) =>
          this.estimateForm.controls.lat.hasError(err.errorType) ||
          this.estimateForm.controls.lng.hasError(err.errorType)
      );

      const isInitialPosition =
        !this.estimateForm.controls.lat.touched ||
        !this.estimateForm.controls.lng.touched;

      if (triggeredError || isInitialPosition) {
        this.coordinatesError =
          triggeredError?.message || 'Please, provide the coordinates of sale';
        return;
      }

      const { reports, averagePrice } = await this.reportsService.getEstimate({
        make,
        model,
        year,
        mileage,
        lat,
        lng,
      });

      this.setEstimates({ averagePrice, make, model, year, reports });
      this.estimateForm.reset();
    } catch (err) {
      console.error(err);
      this.resetEstimates();
    }
  }

  setMarker(position: google.maps.LatLngLiteral) {
    this.markerPosition = position;
    this.estimateForm.controls.lat.setValue(position?.lat);
    this.estimateForm.controls.lat.markAsTouched();
    this.estimateForm.controls.lng.setValue(position?.lng);
    this.estimateForm.controls.lng.markAsTouched();
  }

  removeMarker() {
    this.markerPosition = null;
    this.estimateForm.controls.lat.setValue(null);
    this.estimateForm.controls.lng.setValue(null);
  }

  handleMarkerEvent(event: google.maps.MapMouseEvent) {
    const position = event?.latLng?.toJSON() || null;

    const isPositionTheSame =
      position &&
      position!.lat === this.estimateForm.value.lat &&
      position!.lng === this.estimateForm.value.lng;

    if (isPositionTheSame) {
      return this.removeMarker();
    }

    this.setMarker(position!);
  }
}
