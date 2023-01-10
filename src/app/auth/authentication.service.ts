import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Credentials, CredentialsService } from './credentials.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { environment } from 'src/environments/environment';
import { AppConfigService } from '@shared/services/app-config.service';
export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _isAuthenticationFailedSubject: Subject<boolean>;
  isAuthenticationFailedObserver$: Observable<boolean>;

  constructor(
    private credentialsService: CredentialsService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private appConfigService: AppConfigService
  ) {
    this._isAuthenticationFailedSubject = new Subject<boolean>();
    this.isAuthenticationFailedObserver$ = this._isAuthenticationFailedSubject.asObservable();
  }

  login(context: LoginContext): void {
    this.credentialsService.setCredentials();
    const url = `${this.appConfigService.apiUrl}/signin`; //'http://localhost:4000/signin';
    this.httpClient.post(url, context).subscribe(
      (data: any) => {
        if (data.error) {
          //this.error = data.error;
          this._isAuthenticationFailedSubject.next(true);
        }
        if (data.token) {
          this.credentialsService.setCredentials(data);
          this.router.navigate([this.route.snapshot.queryParams['redirect'] || 'customer'], { replaceUrl: true });
        }
      },
      (error) => {
        //this.error = error;
        this._isAuthenticationFailedSubject.next(true);
      }
    );
  }
  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login_bkp(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    let data = {
      username: context.username,
      token: '',
    };

    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }
}
