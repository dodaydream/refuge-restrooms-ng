import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Places {
    id: number;
    name: string;
    street: string;
    city: string;
    state: string;
    accessible: boolean;
    unisex: boolean;
    directions: string;
    comment: string;
    latitude: number;
    longitude: number;
    created_at: Date;
    updated_at: Date;
    downvote: number;
    upvote: number;
    country: string;
    changing_table: boolean;
    edit_id: number;
    approved: boolean;
    distance: number;
    bearing: number;
}

export type GetByLocationResponse = Places[]

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly ENDPOINT_URL = 'http://localhost:3000'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getList(lat: number, lng: number): Observable<GetByLocationResponse>{
    return this.http.get<GetByLocationResponse>(`${this.ENDPOINT_URL}/by-location?lat=${lat}&lng=${lng}`);
  }
}