import { Component, Input } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  CurrencyPipe,
  TitleCasePipe,
  DecimalPipe,
} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Report } from '../interfaces/report';

@Component({
  selector: 'ucea-report',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    MatCardModule,
    TitleCasePipe,
    DecimalPipe,
    GoogleMap,
    MapMarker,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  @Input() report!: Report;
  markerSpot!: google.maps.LatLngLiteral;

  async ngOnInit(): Promise<void> {
    this.markerSpot = { lat: this.report.lat, lng: this.report.lng };
  }
}
