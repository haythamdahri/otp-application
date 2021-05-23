import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  getOtpOperations(pageable: any): Observable<{content: [], pageable: any}> {
    return this.http
      .get<any>(`${environment.otpApi}/api/v1/otp/currentuser/operations`)
      .pipe(
        retry(5),
        catchError((error) => {
          throw new Error(error);
        })
      );
  }
}
