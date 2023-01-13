import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@shared/services/app-config.service';
import { OS_Sredstva } from '@app/models/HttpResponses/popis.responses';

@Injectable()
export class PopisService {
  private _sredstvaSubject: BehaviorSubject<Array<OS_Sredstva>>;
  private _isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient, private appConfigService: AppConfigService) {
    this._sredstvaSubject = new BehaviorSubject<Array<OS_Sredstva>>([]);
    this._isLoadingSubject = new BehaviorSubject(false);
  }

  loadSredstva() {
    this._isLoadingSubject.next(true);
    this.httpClient.get<Array<OS_Sredstva>>(`${this.appConfigService.popisTablesUrl}/os_sredstva`).subscribe((res) => {
      this._sredstvaSubject.next(res);
      this._isLoadingSubject.next(false);
    });
  }

  get sredstva$() {
    return this._sredstvaSubject.asObservable();
  }

  get isLoading$() {
    return this._isLoadingSubject.asObservable();
  }
}
