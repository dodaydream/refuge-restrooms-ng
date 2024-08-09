import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';
import { AppService, GetByLocationResponse, Places } from './app.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  places: Places[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor (private service: AppService) { }

  ngOnInit() {
    this.fetchLocations(43.6532, -79.3832); // (Toronto)
  }

  fetchLocations(lat: number, lng: number): void {
    this.isLoading = true;
    this.service.getList(lat, lng).subscribe({
      next: (data: GetByLocationResponse) => {
        this.places = data;
        this.errorMessage = null;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error: ${error.message}`;
        this.places = [];
        this.isLoading = false;
      }
    });
  }
}
