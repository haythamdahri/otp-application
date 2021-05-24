import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Otp } from '../models/otp';
import { Page } from '../pagination/page';
import { Pageable } from '../pagination/pageable';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  getOtpOperations(pageable: Pageable): Observable<Page<Otp>> {
    const params: Params = new HttpParams().append('page', pageable?.pageNumber).append('size', pageable?.pageSize);
    return this.http
      .get<Page<Otp>>(`${environment.otpApi}/api/v1/otp/currentuser/operations`, {params})
      .pipe(
        retry(5),
        catchError((error) => {
          throw new Error(error);
        })
      );
  }

  deleteOtpOperation(id: number): Observable<void> {
    return this.http
      .delete<void>(`${environment.otpApi}/api/v1/otp/${id}`)
      .pipe(
        retry(5),
        catchError((error) => {
          throw new Error(error);
        })
      );
  }
}
