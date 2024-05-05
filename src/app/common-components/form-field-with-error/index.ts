import { Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { IError } from '../../interfaces/validation-error';

@Component({
  selector: 'ucea-form-field-with-error',
  templateUrl: 'index.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BaseFieldWithError {
  @Input({ required: true }) field!: FormControl;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) errorsList!: IError[];
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  errorMessage = '';

  ngAfterComponentInit() {
    merge(this.field.statusChanges, this.field.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    const triggeredError = this.errorsList.find((err) =>
      this.field.hasError(err.errorType)
    );

    if (triggeredError) {
      this.errorMessage = triggeredError.message;
    } else {
      this.errorMessage = '';
    }
  }
}
