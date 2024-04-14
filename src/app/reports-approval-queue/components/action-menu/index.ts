import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'action-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class ActionMenu {
  @Input() reportId!: string;
  isShown: boolean = false;

  show() {
    this.isShown = true;
  }

  hide() {
    this.isShown = false;
    console.log(this.isShown);
  }

  approveReport() {
    console.log('approve');
    this.hide();
  }

  rejectReport() {
    console.log('reject');
    this.isShown = false;
  }
}
