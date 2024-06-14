import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CommonButton } from '../common-components/button';
import { FormCard } from '../common-components/form-card';
import { BaseFieldWithError } from '../common-components/form-field-with-error';
import { IError } from '../interfaces/validation-error';

@Component({
  selector: 'ucea-add-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonButton,
    MatInputModule,
    MatFormFieldModule,
    FormCard,
    BaseFieldWithError,
    GoogleMap,
    MapMarker,
  ],
  templateUrl: './add-report.component.html',
  styleUrl: './add-report.component.scss',
})
export class AddReportComponent {
  reportsService: ReportService = inject(ReportService);
  markerPosition: google.maps.LatLngLiteral | null = null;
  coordinatesError: string = '';
  addReportForm = new FormGroup({
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
    price: new FormControl(0, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(1000000),
      ],
      nonNullable: true,
    }),
    mileage: new FormControl(0, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(1000000),
      ],
      nonNullable: true,
    }),
    description: new FormControl(''),
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
    price: [
      { errorType: 'required', message: 'Price is required' },
      { errorType: 'min', message: "Price can't be less than 0" },
      {
        errorType: 'max',
        message: `Maximum accepted price is 1000000`,
      },
    ],
    mileage: [
      { errorType: 'required', message: 'Mileage is required' },
      { errorType: 'min', message: "Mileage can't be less than 0" },
      {
        errorType: 'max',
        message: `Maximum accepted mileage is 1000000`,
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

  get currentYear() {
    return new Date().getFullYear();
  }

  submitForm() {
    const triggeredError = this.errors['coordinates'].find(
      (err) =>
        this.addReportForm.controls.lat.hasError(err.errorType) ||
        this.addReportForm.controls.lng.hasError(err.errorType)
    );

    if (triggeredError) {
      this.coordinatesError = triggeredError.message;
      return;
    }

    this.coordinatesError = '';
    this.reportsService
      .addReport({
        make: this.addReportForm.value.make!.toLowerCase(),
        model: this.addReportForm.value.model!.toLowerCase(),
        year: this.addReportForm.value.year!,
        price: this.addReportForm.value.price!,
        mileage: this.addReportForm.value.mileage!,
        description: this.addReportForm.value.description!,
        lat: this.addReportForm.value.lat!,
        lng: this.addReportForm.value.lng!,
      })
      .then(() => this.addReportForm.reset());
  }

  setMarker(position: google.maps.LatLngLiteral) {
    this.markerPosition = position;
    this.addReportForm.controls.lat.setValue(position?.lat);
    this.addReportForm.controls.lat.setValue(position?.lng);
  }

  removeMarker() {
    this.markerPosition = null;
    this.addReportForm.controls.lat.setValue(null);
    this.addReportForm.controls.lat.setValue(null);
  }

  handleMarkerEvent(event: google.maps.MapMouseEvent) {
    const position = event?.latLng?.toJSON() || null;

    const isPositionTheSame =
      position &&
      position!.lat === this.addReportForm.value.lat &&
      position!.lng === this.addReportForm.value.lng;

    if (isPositionTheSame) {
      return this.removeMarker();
    }

    this.setMarker(position!);
  }
}
