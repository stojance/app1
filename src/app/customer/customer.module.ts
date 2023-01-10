import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';

@NgModule({
  declarations: [CustomerComponent, CustomerListComponent, CustomerAddComponent],
  imports: [CommonModule, TranslateModule, CustomerRoutingModule, FormsModule, SharedModule],
})
export class CustomerModule {}
