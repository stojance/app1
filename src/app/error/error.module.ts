import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [CommonModule, TranslateModule, ErrorRoutingModule],
  declarations: [ErrorComponent],
})
export class ErrorModule {}
