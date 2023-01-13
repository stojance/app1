import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopisService } from './popis.service';
import { Observable, Subscription } from 'rxjs';
import { OS_Sredstva, V_Popisani } from '@app/models/HttpResponses/popis.responses';
import { SharedModule } from '@app/@shared';

export enum TableToShow {
  None = 'None',
  Sredstva = 'Sredstva',
  Popisani = 'Popisani',
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
  sredstva$: Observable<OS_Sredstva[]>;
  popisani$: Observable<V_Popisani[]>;
  sredstvaSubscription: Subscription;
  popisaniSubscription: Subscription;

  dtOptions: DataTables.Settings = {};
  dtOptionsPopisani: DataTables.Settings = {};

  tableToShow: TableToShow = TableToShow.None;

  constructor(private popisService: PopisService) {
    this.isLoading$ = this.popisService.isLoading$;
    this.sredstva$ = this.popisService.sredstva$;
    this.popisani$ = this.popisService.popisani$;
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
          title: 'Inventaren broj',
          data: 'InventarenBroj',
        },
        {
          title: 'Naziv',
          data: 'Naziv',
        },
      ],
      data: [],
    };
    this.dtOptionsPopisani = {
      pagingType: 'full_numbers',
      columns: [
        {
          title: 'Ured broj',
          data: 'UredBroj',
        },
        {
          title: 'ID',
          data: 'OS_ID',
        },
        {
          title: 'Inventaren broj',
          data: 'InventarenBroj',
        },
        {
          title: 'Naziv',
          data: 'Naziv',
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
  }

  ngOnDestroy(): void {
    this.sredstvaSubscription.unsubscribe();
    this.popisaniSubscription.unsubscribe();
  }

  loadSredstva() {
    this.popisService.loadSredstva();
  }

  loadPopisani() {
    this.popisService.loadPopisani();
  }
}
