import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Shell } from '@app/shell/shell.service';
import { ErrorComponent } from './error.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'error', component: ErrorComponent, data: { title: marker('Error') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ErrorRoutingModule {}
