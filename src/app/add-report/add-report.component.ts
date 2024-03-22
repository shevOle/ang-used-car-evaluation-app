import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReportService } from '../services/reports.service';

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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-report.component.html',
  styleUrl: './add-report.component.scss',
})
export class AddReportComponent {
  reportsService: ReportService = inject(ReportService);
  addRepotForm = new FormGroup({
    make: new FormControl('', { validators: [Validators.required] }),
    model: new FormControl('', { validators: [Validators.required] }),
    year: new FormControl(1990, {
      validators: [
        Validators.required,
        Validators.min(1990),
        Validators.max(this.currentYear),
      ],
    }),
    price: new FormControl(0, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(1000000),
      ],
    }),
    mileage: new FormControl(0, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(1000000),
      ],
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

  get make() {
    return this.addRepotForm.get('make')!;
  }

  get model() {
    return this.addRepotForm.get('model')!;
  }

  get year() {
    return this.addRepotForm.get('year')!;
  }

  get price() {
    return this.addRepotForm.get('price')!;
  }

  get mileage() {
    return this.addRepotForm.get('mileage')!;
  }

  get description() {
    return this.addRepotForm.get('description')!;
  }

  get lat() {
    return this.addRepotForm.get('lat')!;
  }

  get lng() {
    return this.addRepotForm.get('lng')!;
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
    this.reportsService.addReport({
      make: this.addRepotForm.value.make!.toLowerCase(),
      model: this.addRepotForm.value.model!.toLowerCase(),
      year: this.addRepotForm.value.year!,
      price: this.addRepotForm.value.price!,
      mileage: this.addRepotForm.value.mileage!,
      description: this.addRepotForm.value.description!,
      lat: 0,
      lng: 0,
    });
  }
}
