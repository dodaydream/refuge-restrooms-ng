import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Places } from '../app.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
})
export class MapComponent implements AfterViewInit, OnChanges {
  private map?: L.Map;
  private markers?: L.MarkerClusterGroup;

  @Input() places: Places[] = [];

  private initMap(): void {
    this.map = L.map('map', {
      center: [43.6532, -79.3832],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    );

    tiles.addTo(this.map);
  }

  private updateMarkers(): void {
    if (!this.map) return;

    // Clear existing markers
    if (this.markers instanceof L.Marker) {
      this.markers.clearLayers()
    } else {
      this.markers = L.markerClusterGroup()
      this.markers.addTo(this.map)
    }

    // Add new markers
    this.places.forEach(place => {
      this.markers?.addLayer(
        L.marker([place.latitude, place.longitude])
      )
    });
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['places'] && this.map) {
      this.updateMarkers();
    }
  }
}
