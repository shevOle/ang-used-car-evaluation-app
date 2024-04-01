import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Report } from '../interfaces/report';

@Component({
  selector: 'ucea-report',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  @Input() report!: Report;
}
