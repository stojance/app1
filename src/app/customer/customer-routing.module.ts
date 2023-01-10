import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { Shell } from '@app/shell/shell.service';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'customer',
      component: CustomerComponent,
      data: { title: marker('Customer') },
      canActivate: [AuthenticationGuard],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CustomerRoutingModule {}
