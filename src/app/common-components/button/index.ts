import { Component, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ucea-button',
  templateUrl: 'index.html',
  styleUrl: 'index.scss',
  standalone: true,
  imports: [MatButtonModule, TitleCasePipe],
})
export class CommonButton {
  @Input({ required: true }) visual!: 'main' | 'secondary' | 'cancel';
  @Input({ required: true }) label!: string;
  @Input({ required: true }) onClick!: Function;
  @Input() disabled: boolean = false;
}
