import { Component, Input } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  CurrencyPipe,
  TitleCasePipe,
} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Report } from '../interfaces/report';

@Component({
  selector: 'ucea-report',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, MatCardModule, TitleCasePipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  @Input() report!: Report;
}
