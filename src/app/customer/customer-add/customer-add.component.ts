import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '@app/models/customer';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddComponent implements OnInit, AfterViewInit {
  FName: string;
  LName: string;
  @ViewChild('myForm')
  CustomerForm: NgForm;
  @Output()
  OnCancel: EventEmitter<void> = new EventEmitter();
  @Output()
  OnSave: EventEmitter<Customer> = new EventEmitter();
  @ViewChild('firstName')
  FirstNameControl: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.FirstNameControl.nativeElement.focus();
  }

  reset() {
    this.CustomerForm.reset();
  }

  save() {
    this.OnSave.emit(new Customer(this.FName, this.LName));
    this.reset();
  }

  cancel() {
    this.OnCancel.emit();
    this.reset();
  }
}
