import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
    this.pictureChooserFormField.setValue(this.user?.profilePicture || '');
  }

  get currentUser() {
    return this.user;
  }

  get pictureUrl() {
    return this.user?.profilePicture;
  }

  openPictureChooser() {
    this.dialog.open(CommonDialogComponent, {
      data: {
        // title: 'Choose your new avatar',
        acceptBtnAction: this.acceptChanges.bind(this),
        acceptBtnTitle: 'Ok',
        cancelBtnTitle: 'Cancel',
        formField: this.pictureChooserFormField,
      },
    });
  }

  acceptChanges() {
    this.userService.updateUser({
      id: this.user?.id!,
      profilePicture: this.pictureChooserFormField.value!,
    });
  }
}
