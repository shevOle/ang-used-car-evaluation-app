import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReportService } from '../services/reports.service';
import { CommonButton } from '../common-components/button';

type FormControlFieldName =
  | 'make'
  | 'model'
  | 'year'
  | 'price'
  | 'mileage'
  | 'description'
  | 'lat'
  | 'lng';

@Component({
  selector: 'ucea-add-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommonButton],
  templateUrl: './add-report.component.html',
  styleUrl: './add-report.component.scss',
})
export class AddReportComponent {
  reportsService: ReportService = inject(ReportService);
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
      nonNullable: true,
    }),
    lng: new FormControl(0, {
      validators: [
        Validators.required,
        Validators.min(-180),
        Validators.max(180),
      ],
      nonNullable: true,
    }),
  });

  get make() {
    return this.addReportForm.get('make')!;
  }

  get model() {
    return this.addReportForm.get('model')!;
  }

  get year() {
    return this.addReportForm.get('year')!;
  }

  get price() {
    return this.addReportForm.get('price')!;
  }

  get mileage() {
    return this.addReportForm.get('mileage')!;
  }

  get description() {
    return this.addReportForm.get('description')!;
  }

  get lat() {
    return this.addReportForm.get('lat')!;
  }

  get lng() {
    return this.addReportForm.get('lng')!;
  }

  get currentYear() {
    return new Date().getFullYear();
  }

  checkFormField(fieldName: FormControlFieldName, error: string): boolean {
    return (
      this[fieldName].invalid &&
      this[fieldName].touched &&
      this[fieldName].dirty &&
      this[fieldName].errors?.[error]
    );
  }

  submitForm() {
    this.reportsService
      .addReport({
        make: this.addReportForm.value.make!.toLowerCase(),
        model: this.addReportForm.value.model!.toLowerCase(),
        year: this.addReportForm.value.year!,
        price: this.addReportForm.value.price!,
        mileage: this.addReportForm.value.mileage!,
        description: this.addReportForm.value.description!,
        lat: 0,
        lng: 0,
      })
      .then(() => this.addReportForm.reset());
  }
}
