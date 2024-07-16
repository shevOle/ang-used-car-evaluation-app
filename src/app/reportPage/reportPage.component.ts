import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Report } from '../interfaces/report';
import { ReportService } from '../services/reports.service';
import { MapComponent } from '../common-components/map-component';

@Component({
  selector: 'ucea-reportPage',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MapComponent],
  templateUrl: './reportPage.component.html',
  styleUrl: './reportPage.component.scss',
})
export class ReportPageComponent {
  protected $report!: Report;
  protected markerSpot!: google.maps.LatLngLiteral;

  constructor(
    protected reportsService: ReportService,
    protected route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const reportId: string = this.route.snapshot.params['id'];
    this.$report = await this.reportsService.getReportById(reportId);
    this.markerSpot = { lat: this.$report.lat, lng: this.$report.lng };
  }
}
