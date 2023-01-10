import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  apiUrl: string;

  constructor(private httpClient: HttpClient) {}

  loadConfig(): Promise<void> {
    return this.httpClient
      .get<{ apiUrl: string }>('./assets/config.json')
      .toPromise()
      .then((data: any) => {
        this.apiUrl = data.apiUrl;
      });
  }
}
