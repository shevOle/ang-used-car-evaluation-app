import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Report } from './interfaces/report';
import { Location } from './interfaces/location';

@Component({
  selector: 'ucea-report',
  standalone: true,
  imports: [CommonModule, GoogleMap, MapMarker],
  inputs: [{ name: 'report', required: true }],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  @Input()({ required: true })
  public report!: Report;

  zoom: number = 10;
  center: Location = { lat: this.report?.lat, lng: this.report?.lng };
  markerPosition: Location = {
    lat: this.report?.lat,
    lng: this.report?.lng,
  };
}
