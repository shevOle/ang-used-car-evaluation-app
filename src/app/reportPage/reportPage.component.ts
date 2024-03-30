import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Report } from '../interfaces/report';
import { ReportService } from '../services/reports.service';
import { formatMoney } from '../helpers/formatMoney';

@Component({
  selector: 'ucea-reportPage',
  standalone: true,
  imports: [CommonModule],
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
    this.$report = this.reportsService.getReportById(reportId).then((r) => {
      r.price = formatMoney.format(r.price) as any;
      return r;
    });
  }
}
