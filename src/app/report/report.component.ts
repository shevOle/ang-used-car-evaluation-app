import { Component, Input } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  CurrencyPipe,
  TitleCasePipe,
  DecimalPipe,
} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Report } from '../interfaces/report';
import { MapComponent } from '../common-components/map-component';

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
    MapComponent,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  @Input() report!: Report;
  markerSpot: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  async ngOnInit(): Promise<void> {
    this.markerSpot = { lat: this.report.lat, lng: this.report.lng };
  }
}
