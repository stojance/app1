import { Routes, Route } from '@angular/router';
import { AuthenticationGuard } from '@app/auth';
import { ShellComponent } from './shell.component';
import { TableCompleteComponent } from '../table-complete/table-complete.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

/**
 * Provides helper methods to create routes.
 */
export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    routes.push({
      path: 'table-complete',
      component: TableCompleteComponent,
      data: { title: marker('Table') },
      canActivate: [AuthenticationGuard],
    });

    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
    };
  }
}
