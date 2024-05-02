import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'ucea-picture-chooser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class PictureChooserComponent {
  @Input({ required: true }) formField!: FormControl;

  profilePictures = [
    { url: '../assets/profile/yoda.png', name: 'yoda' },
    { url: '../assets/profile/luke.png', name: 'luke' },
    { url: '../assets/profile/chewie.png', name: 'chewie' },
    { url: '../assets/profile/leya.png', name: 'leya' },
    { url: '../assets/profile/solo.png', name: 'solo' },
    { url: '../assets/profile/mando.png', name: 'mando' },
  ];
  chosenPictureIndex = 0;
  pictureChangeEventEmitter = new EventEmitter();

  constructor() {
    merge(this.pictureChangeEventEmitter)
      .pipe(takeUntilDestroyed())
      .subscribe((x) => this.formField.setValue(this.profilePictures[x].url));
  }

  get picture() {
    return this.profilePictures[this.chosenPictureIndex];
  }

  scrollImagesBackwards() {
    if (this.chosenPictureIndex === 0) {
      return (this.chosenPictureIndex = this.profilePictures.length - 1);
    }

    return this.pictureChangeEventEmitter.emit(--this.chosenPictureIndex);
  }

  scrollImagesForward() {
    if (this.chosenPictureIndex === this.profilePictures.length - 1) {
      return (this.chosenPictureIndex = 0);
    }

    return this.pictureChangeEventEmitter.emit(++this.chosenPictureIndex);
  }
}
