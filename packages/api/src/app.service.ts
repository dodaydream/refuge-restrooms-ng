import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, map, Observable } from 'rxjs';

export interface GetByLocationQueryParams {
  page?: number;
  perPage?: number;
  offset?: number;
  ada?: boolean;
  unisex?: boolean;
  lat: number;
  lng: number;
}

@Injectable()
export class AppService {

  readonly ENDPOINT_URL = 'https://www.refugerestrooms.org/api'
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getByLocation(queryParams: GetByLocationQueryParams): Observable<AxiosResponse<any>> {
    return this.httpService.get(this.ENDPOINT_URL + '/v1/restrooms/by_location', {
      params: queryParams
    }).pipe(
      map(res => res.data)
    ).pipe(
      catchError((e: Error) => {
        this.logger.error("Cannot fetch data from endpoint", e.stack);
        throw new ServiceUnavailableException()
      })
    )
  }
}
