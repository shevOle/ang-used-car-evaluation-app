import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PictureChooserComponent } from '../profile-picture-chooser';
import { FormControl } from '@angular/forms';

interface DialogData {
  //   title: string;
  acceptBtnAction: () => void;
  acceptBtnTitle: string;
  cancelBtnTitle: string;
  formField: FormControl;
}

@Component({
  selector: 'ucea-dialog',
  templateUrl: 'index.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    PictureChooserComponent,
  ],
})
export class CommonDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<CommonDialogComponent>
  ) {}

  confirm() {
    this.data.acceptBtnAction();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
