import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@shared/services/app-config.service';
import { OS_Sredstva, V_Nepopisani, V_Popisani } from '@app/models/HttpResponses/popis.responses';

@Injectable()
export class PopisService {
  private _sredstvaSubject: BehaviorSubject<Array<OS_Sredstva>>;
  private _popisaniSubject: BehaviorSubject<Array<V_Popisani>>;
  private _nePopisaniSubject: BehaviorSubject<Array<V_Nepopisani>>;
  private _isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient, private appConfigService: AppConfigService) {
    this._sredstvaSubject = new BehaviorSubject<Array<OS_Sredstva>>([]);
    this._popisaniSubject = new BehaviorSubject<Array<V_Popisani>>([]);
    this._nePopisaniSubject = new BehaviorSubject<Array<V_Nepopisani>>([]);
    this._isLoadingSubject = new BehaviorSubject(false);
  }

  loadSredstva() {
    this._isLoadingSubject.next(true);
    this.httpClient
      .get<Array<OS_Sredstva>>(`${this.appConfigService.popisApiUrl}/table/os_sredstva`)
      .subscribe((res) => {
        this._popisaniSubject.next([]);
        this._nePopisaniSubject.next([]);
        this._sredstvaSubject.next(res);
        this._isLoadingSubject.next(false);
      });
  }

  loadPopisani() {
    this._isLoadingSubject.next(true);
    this.httpClient.get<Array<V_Popisani>>(`${this.appConfigService.popisApiUrl}/table/v_popisani`).subscribe((res) => {
      this._sredstvaSubject.next([]);
      this._nePopisaniSubject.next([]);
      this._popisaniSubject.next(res);
      this._isLoadingSubject.next(false);
    });
  }

  loadNePopisani() {
    this._isLoadingSubject.next(true);
    this.httpClient
      .get<Array<V_Nepopisani>>(`${this.appConfigService.popisApiUrl}/table/v_nepopisani`)
      .subscribe((res) => {
        this._sredstvaSubject.next([]);
        this._popisaniSubject.next([]);
        this._nePopisaniSubject.next(res);
        this._isLoadingSubject.next(false);
      });
  }

  get sredstva$() {
    return this._sredstvaSubject.asObservable();
  }

  get popisani$() {
    return this._popisaniSubject.asObservable();
  }

  get nePopisani$() {
    return this._nePopisaniSubject.asObservable();
  }

  get isLoading$() {
    return this._isLoadingSubject.asObservable();
  }
}
