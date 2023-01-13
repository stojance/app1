import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopisService } from './popis.service';
import { Observable, Subscription } from 'rxjs';
import { OS_Sredstva } from '@app/models/HttpResponses/popis.responses';
import { SharedModule } from '@app/@shared';

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
  sredstvaSubscription: Subscription;
  dtOptions: DataTables.Settings = {};
  showTable: boolean = false;

  constructor(private popisService: PopisService) {
    this.isLoading$ = this.popisService.isLoading$;
    this.sredstva$ = this.popisService.sredstva$;
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
    this.sredstvaSubscription = this.sredstva$.subscribe((data) => {
      this.dtOptions = Object.assign(this.dtOptions, { data });
    });
  }

  ngOnDestroy(): void {
    this.sredstvaSubscription.unsubscribe();
  }

  loadSredstva() {
    this.popisService.loadSredstva();
  }
}
