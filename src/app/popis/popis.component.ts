/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopisService } from './popis.service';
import { Observable, Subscription } from 'rxjs';
import { V_Sredstva, V_Nepopisani, V_Popisani, V_PopisaniNovoNajdeni } from '@app/models/HttpResponses/popis.responses';
import { SharedModule } from '@app/@shared';
import { AppConfigService } from '@app/@shared/services/app-config.service';

export enum TableToShow {
  None = 'None',
  Sredstva = 'Sredstva',
  Popisani = 'Popisani',
  PopisaniNovoNajdeni = 'PopisaniNovoNajdeni',
  NePopisani = 'NePopisani',
}

@Component({
  selector: 'app-popis',
  standalone: true,
  imports: [CommonModule, SharedModule],
  providers: [PopisService],
  templateUrl: './popis.component.html',
  styleUrls: ['./popis.component.scss'],
})
export class PopisComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  sredstva$: Observable<V_Sredstva[]>;
  popisani$: Observable<V_Popisani[]>;
  popisaniNovoNajdeni$: Observable<V_PopisaniNovoNajdeni[]>;
  nePopisani$: Observable<V_Nepopisani[]>;
  sredstvaSubscription: Subscription;
  popisaniSubscription: Subscription;
  popisaniNovoNajdeniSubscription: Subscription;
  nePopisaniSubscription: Subscription;

  dtOptions: DataTables.Settings = {};
  dtOptionsPopisani: DataTables.Settings = {};
  dtOptionsPopisaniNovoNajdeni: DataTables.Settings = {};
  dtOptionsNePopisani: DataTables.Settings = {};

  tableToShow: TableToShow = TableToShow.None;

  constructor(private popisService: PopisService, private appConfigService: AppConfigService) {
    this.isLoading$ = this.popisService.isLoading$;
    this.sredstva$ = this.popisService.sredstva$;
    this.popisani$ = this.popisService.popisani$;
    this.popisaniNovoNajdeni$ = this.popisService.popisaniNovoNajdeni$;
    this.nePopisani$ = this.popisService.nePopisani$;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      columns: [
        {
          title: 'ID',
          data: 'OS_ID',
        },
        {
          title: 'Инв.Број',
          data: 'InventarenBroj',
        },
        {
          title: 'Назив',
          data: 'Naziv',
        },
        {
          title: 'Локација',
          data: null,
          render: (data, type) => {
            return data.OrgEdinicaNaziv + ', ' + data.LokacijaNaziv+', '+ data.SpratNaziv+', '+ data.SobaNaziv+', '+ data.OdgovornoLice;
          }
        },
      ],
      data: [],
    };
    this.dtOptionsPopisani = {
      pagingType: 'full_numbers',
      columns: [
        {
          title: 'Уред бр.',
          data: 'UredBroj',
        },
        {
          title: 'ID',
          data: 'OS_ID',
        },
        {
          title: 'Инв.Број',
          data: 'InventarenBroj',
        },
        {
          title: 'Назив',
          data: 'Naziv',
        },
        {
          title: 'Има промени',
          data: 'ImaPromena',
        },
        {
          title: 'Промени',
          data: 'Promeni',
        },
      ],
      data: [],
    };
    this.dtOptionsPopisaniNovoNajdeni = {
      pagingType: 'full_numbers',
      columns: [
        {
          title: 'Уред бр.',
          data: 'UredBroj',
        },
        {
          title: 'Забелешка',
          data: 'Zabeleska',
        },
        {
          title: 'Време',
          data: 'DatPromena',
        },
        {
          title: 'Корисник',
          data: 'KorisnikNaziv',
        },
      ],
      data: [],
    };
    this.dtOptionsNePopisani = {
      pagingType: 'full_numbers',
      columns: [
        {
          title: 'ID',
          data: 'OS_ID',
        },
        {
          title: 'Инв.Број',
          data: 'InventarenBroj',
        },
        {
          title: 'Назив',
          data: 'Naziv',
        },
        {
          title: 'Локација',
          data: null,
          render: (data, type) => {
            return data.OrgEdinicaNaziv + ', ' + data.LokacijaNaziv+', '+ data.SpratNaziv+', '+ data.SobaNaziv+', '+ data.OdgovornoLice;
          }
        },
      ],
      data: [],
    };
    this.sredstvaSubscription = this.sredstva$.subscribe((data) => {
      this.dtOptions = Object.assign(this.dtOptions, { data });
      this.tableToShow = data.length > 0 ? TableToShow.Sredstva : TableToShow.None;
    });
    this.popisaniSubscription = this.popisani$.subscribe((data) => {
      this.dtOptionsPopisani = Object.assign(this.dtOptionsPopisani, { data });
      this.tableToShow = data.length > 0 ? TableToShow.Popisani : TableToShow.None;
    });
    this.popisaniNovoNajdeniSubscription = this.popisaniNovoNajdeni$.subscribe(data => {
      this.dtOptionsPopisaniNovoNajdeni = Object.assign(this.dtOptionsPopisaniNovoNajdeni, { data });
      this.tableToShow = data.length > 0 ? TableToShow.PopisaniNovoNajdeni : TableToShow.None;
    });
    this.nePopisaniSubscription = this.nePopisani$.subscribe((data) => {
      this.dtOptionsNePopisani = Object.assign(this.dtOptionsNePopisani, { data });

      this.tableToShow = data.length > 0 ? TableToShow.NePopisani : TableToShow.None;
    });
  }

  ngOnDestroy(): void {
    this.sredstvaSubscription.unsubscribe();
    this.popisaniSubscription.unsubscribe();
    this.popisaniNovoNajdeniSubscription.unsubscribe();
    this.nePopisaniSubscription.unsubscribe();
  }

  loadSredstva() {
    this.popisService.loadSredstva();
  }

  loadPopisani() {
    this.popisService.loadPopisani();
  }

  loadPopisaniNovoNajdeni() {
    this.popisService.loadPopisaniNovoNajdeni();
  }

  loadNePopisani() {
    this.popisService.loadNePopisani();
  }

  get sredstvaExportUrl() {
    return `${this.appConfigService.popisApiUrl}/exporttoexcel/v_sredstva`;
  }

  get popisaniExportUrl() {
    return `${this.appConfigService.popisApiUrl}/exporttoexcel/v_popisani`;
  }
  get popisaniNovoNajdeniExportUrl() {
    return `${this.appConfigService.popisApiUrl}/exporttoexcel/V_PopisaniNovoNajdeni`;
  }
  get nePopisaniExportUrl() {
    return `${this.appConfigService.popisApiUrl}/exporttoexcel/v_nepopisani`;
  }
}
