import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Report } from './interfaces/report';

@Component({
  selector: 'ucea-report',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  @Input() report!: Report;
}
