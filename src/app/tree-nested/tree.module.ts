import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TreeRoutingModule } from './tree-routing.module';
import { TreeNestedComponent } from './tree-nested.component';

@NgModule({
  imports: [CommonModule, TranslateModule, TreeRoutingModule],
  declarations: [TreeNestedComponent],
})
export class TreeModule {}
