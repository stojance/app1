/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@shared/services/app-config.service';
import { V_Sredstva, V_Nepopisani, V_Popisani, V_PopisaniNovoNajdeni } from '@app/models/HttpResponses/popis.responses';

@Injectable()
export class PopisService {
  private _sredstvaSubject: BehaviorSubject<Array<V_Sredstva>>;
  private _popisaniSubject: BehaviorSubject<Array<V_Popisani>>;
  private _popisaniNovoNajdeniSubject: BehaviorSubject<Array<V_PopisaniNovoNajdeni>>;
  private _nePopisaniSubject: BehaviorSubject<Array<V_Nepopisani>>;
  private _isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient, private appConfigService: AppConfigService) {
    this._sredstvaSubject = new BehaviorSubject<Array<V_Sredstva>>([]);
    this._popisaniSubject = new BehaviorSubject<Array<V_Popisani>>([]);
    this._popisaniNovoNajdeniSubject = new BehaviorSubject<Array<V_PopisaniNovoNajdeni>>([]);
    this._nePopisaniSubject = new BehaviorSubject<Array<V_Nepopisani>>([]);
    this._isLoadingSubject = new BehaviorSubject(false);
  }

  get sredstva$() {
    return this._sredstvaSubject.asObservable();
  }

  get popisani$() {
    return this._popisaniSubject.asObservable();
  }

  get popisaniNovoNajdeni$() {
    return this._popisaniNovoNajdeniSubject.asObservable();
  }

  get nePopisani$() {
    return this._nePopisaniSubject.asObservable();
  }

  get isLoading$() {
    return this._isLoadingSubject.asObservable();
  }

  loadSredstva() {
    this._isLoadingSubject.next(true);
    this.httpClient
      .get<Array<V_Sredstva>>(`${this.appConfigService.popisApiUrl}/table/v_sredstva`)
      .subscribe((res) => {
        this._popisaniSubject.next([]);
        this._nePopisaniSubject.next([]);
        this._popisaniNovoNajdeniSubject.next([]);
        this._sredstvaSubject.next(res);
        this._isLoadingSubject.next(false);
        console.log(res);
      });
  }

  loadPopisani() {
    this._isLoadingSubject.next(true);
    this.httpClient.get<Array<V_Popisani>>(`${this.appConfigService.popisApiUrl}/table/v_popisani`).subscribe((res) => {
      this._sredstvaSubject.next([]);
      this._nePopisaniSubject.next([]);
      this._popisaniNovoNajdeniSubject.next([]);
      this._popisaniSubject.next(res);
      this._isLoadingSubject.next(false);
    });
  }

  loadPopisaniNovoNajdeni() {
    this._isLoadingSubject.next(true);
    this.httpClient.get<Array<V_PopisaniNovoNajdeni>>(`${this.appConfigService.popisApiUrl}/table/V_PopisaniNovoNajdeni`).subscribe((res) => {
      this._sredstvaSubject.next([]);
      this._nePopisaniSubject.next([]);
      this._popisaniSubject.next([]);
      this._popisaniNovoNajdeniSubject.next(res);
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
        this._popisaniNovoNajdeniSubject.next([]);
        this._nePopisaniSubject.next(res);
        this._isLoadingSubject.next(false);
      });
  }
}
