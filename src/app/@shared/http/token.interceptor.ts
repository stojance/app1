import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '../../auth/credentials.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  //constructor(private credentialsService: CredentialsService) { }
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const svc = this.injector.get(CredentialsService);
    let token = svc?.token || '';
    /*const savedCredentials = sessionStorage.getItem('credentials') || localStorage.getItem('credentials');
    if (savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      if (credentials) {
        token = credentials.token;
        // console.log(token);
      }
    }*/
    const authRequest = request.clone({ setHeaders: { 'x-access-token': token } });

    return next.handle(authRequest);
  }
}
