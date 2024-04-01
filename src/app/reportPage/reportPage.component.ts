import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Report } from '../interfaces/report';
import { ReportService } from '../services/reports.service';

@Component({
  selector: 'ucea-reportPage',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './reportPage.component.html',
  styleUrl: './reportPage.component.scss',
})
export class ReportPageComponent {
  protected $report!: Promise<Report>;

  constructor(
    protected reportsService: ReportService,
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const reportId: string = this.route.snapshot.params['id'];
    this.$report = this.reportsService.getReportById(reportId);
  }
}
