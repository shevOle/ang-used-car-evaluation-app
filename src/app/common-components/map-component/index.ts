import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'ucea-map',
  standalone: true,
  imports: [CommonModule, GoogleMap, MapMarker, MatProgressSpinnerModule],
  templateUrl: './index.html',
  //   styleUrl: './index.scss',
})
export class MapComponent {
  @Input() markerSpot: google.maps.LatLngLiteral | null = null;
  @Input() onMapClick: (e: google.maps.MapMouseEvent) => void = () => {};
  @Input() onMarkerClick: (e?: google.maps.MapMouseEvent) => void = () => {};
  @Input() mapOptions?: google.maps.MapOptions;
  options!: google.maps.MapOptions;

  mapClick($event: google.maps.MapMouseEvent) {
    this.onMapClick($event);
  }

  markerClick($event?: google.maps.MapMouseEvent) {
    this.onMarkerClick($event);
  }

  async ngOnInit(): Promise<void> {
    this.options = {
      center: this.markerSpot,
      zoom: 5,
      ...this.mapOptions,
    };
  }
}
