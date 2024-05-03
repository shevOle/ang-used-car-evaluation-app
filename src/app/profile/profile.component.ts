import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/user';
import { FormCard } from '../common-components/form-card';
// import { PictureChooserComponent } from '../common-components/profile-picture-chooser';
import { CommonDialogComponent } from '../common-components/dialog-component';

@Component({
  selector: 'ucea-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormCard,
    MatTooltipModule,
    // PictureChooserComponent,
    CommonDialogComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: IUser | null = null;
  isPictureChooserOpen = false;
  pictureChooserFormField = new FormControl('');

  constructor(private authService: AuthService, public dialog: MatDialog) {
    this.user = this.authService.currentUserValue;
  }

  get currentUser() {
    return this.user;
  }

  get pictureUrl() {
    return this.user?.profilePicture;
  }

  openPictureChooser() {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        // title: 'Choose your new avatar',
        acceptBtnAction: this.accept.bind(this),
        acceptBtnTitle: 'Ok',
        cancelBtnTitle: 'Cancel',
        formField: this.pictureChooserFormField,
      },
    });
  }

  accept() {
    console.log(111, this.pictureChooserFormField?.value);
  }
}
