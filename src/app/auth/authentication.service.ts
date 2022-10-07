import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ApiService } from '../@shared/http/api.service';
import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  email: string;
  password: string;
  remember: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private apiService: ApiService,
    private ngZone: NgZone,
    private router: Router,) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    var path = 'auth/login';

    return this.apiService.post(path, [context]).pipe(
      map((res) => {
        
        // const data = {
        //   email:
        //  }
        const response = { email: res.data.data.email, token: res.data.token };
        this.credentialsService.setCredentials(response, true);
        return res;
      })
    );
    // Replace by proper authentication call
    //   const data = {
    //     email: context.username,
    //     password: context.password,
    //   };

    //   this.apiService.post(path,data).pipe(
    //     map(data => data)
    //    );
    //  const response = {username : 'name' , token :'1234'  };
    //   // this.credentialsService.setCredentials(data, context.remember);
    //    return of(response);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    this.ngZone.run(() => this.router.navigateByUrl('/login'));

    return of(true);
  }
}
