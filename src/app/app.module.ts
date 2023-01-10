import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import {
  RouteReusableStrategy,
  ApiPrefixInterceptor,
  ErrorHandlerInterceptor,
  TokenInterceptor,
  SharedModule,
} from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { CustomerModule } from './customer/customer.module';
import { ErrorModule } from './error/error.module';
import { TreeModule } from './tree-nested/tree.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeConfig } from './@shared/services/app-initializer';
import { AppConfigService } from './@shared/services/app-config.service';
import { AppErrorsHandler } from './@shared/services/app-error-handler.service';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    NgbModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    CustomerModule,
    ErrorModule,
    AuthModule,
    TreeModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      multi: true,
      deps: [AppConfigService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },*/
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorsHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
