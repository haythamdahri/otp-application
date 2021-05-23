import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthRequest } from '../../models/user-auth-request';
import { catchError, map, retry } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signIn(userAuthRequest: UserAuthRequest) {
    return this.httpClient
      .post<{ token: string }>(
        `${environment.otpApi}/api/v1/auth/`,
        userAuthRequest
      )
      .pipe(
        map((response) => {
          // Decode token
          const user = this.decodeToken(response?.token);
          // Store token in local storage
          localStorage.setItem('token', JSON.stringify(user?.token));
          localStorage.setItem(
            'tokenExpiration',
            JSON.stringify(user?.expiration)
          );
          // Return user
          return user;
        }),
        retry(5),
        catchError((error) => {
          throw new Error(error);
        })
      );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    return (
      token != null &&
      token != '' &&
      tokenExpiration != null &&
      tokenExpiration != '' &&
      new Date(Number(tokenExpiration)) > new Date()
    );
  }

  signOut() {
    // Remove local storage items
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }

  // Decode token
  decodeToken(token: string) {
    var decoded = jwtDecode(token);
    let userToken = new User();
    userToken.token = 'Bearer ' + token;
    userToken.username = decoded.sub;
    userToken.expiration = Number(decoded.exp * 1000);
    return userToken;
  }
}
