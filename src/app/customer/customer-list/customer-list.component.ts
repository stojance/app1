import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '@app/models/customer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent implements OnInit {
  @Input()
  Customers$: Observable<Array<Customer>>;
  @Output()
  OnAddNew: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addNew() {
    this.OnAddNew.emit();
  }
}
