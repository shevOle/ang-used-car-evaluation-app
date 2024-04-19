import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ucea-button',
  templateUrl: 'index.html',
  styles: '',
  standalone: true,
  imports: [MatButtonModule],
})
export class CommonButton {
  @Input({ required: true }) type!: 'primary' | 'secondary' | 'cancel';
  @Input({ required: true }) label!: string;
  @Input({ required: true }) onClick!: Function;
  @Input() disabled: boolean = false;
}
