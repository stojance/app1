import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TreeNestedComponent } from './tree-nested.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'tree', component: TreeNestedComponent, data: { title: marker('Tree') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TreeRoutingModule {}
