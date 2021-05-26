import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Otp } from '../models/otp';
import { OtpCheckRequest } from '../models/otp-check-request';
import { OtpRequest } from '../models/otp-request';
import { OtpResponse } from '../models/otp-response';
import { Page } from '../pagination/page';
import { Pageable } from '../pagination/pageable';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  getOtpOperations(pageable: Pageable): Observable<Page<Otp>> {
    const params: Params = new HttpParams()
      .append('page', pageable?.pageNumber)
      .append('size', pageable?.pageSize)
      .append('search', pageable?.search || '');
    return this.http
      .get<Page<Otp>>(
        `${environment.otpApi}/api/v1/otp/currentuser/operations`,
        { params }
      )
      .pipe(
        retry(5),
        catchError((error) => this.handleHttpError(error))
      );
  }

  getOtpOperation(id: string): Observable<Otp> {
    return this.http
      .get<Otp>(`${environment.otpApi}/api/v1/otp/${id}`)
      .pipe(
        retry(5),
        catchError((error) => this.handleHttpError(error))
      );
  }

  getOtpOperationByTransactionNumber(transactionNumber: string): Observable<Otp> {
    return this.http
      .get<Otp>(`${environment.otpApi}/api/v1/otp/transactions/${transactionNumber}`)
      .pipe(
        retry(5),
        catchError((error) => this.handleHttpError(error))
      );
  }

  checkOtpOperation(otpCheckRequest: OtpCheckRequest): Observable<OtpResponse> {
    return this.http
      .post<OtpResponse>(`${environment.otpApi}/api/v1/otp/verification`, otpCheckRequest)
      .pipe(
        catchError((error) => this.handleHttpError(error))
      );
  }

  sendOtp(otpRequest: OtpRequest): Observable<OtpResponse> {
    return this.http
      .post<OtpResponse>(`${environment.otpApi}/api/v1/otp/checking`, otpRequest)
      .pipe(
        retry(5),
        catchError((error) => this.handleHttpError(error))
      );
  }

  deleteOtpOperation(id: number): Observable<void> {
    return this.http
      .delete<void>(`${environment.otpApi}/api/v1/otp/${id}`)
      .pipe(
        retry(5),
        catchError((error) => this.handleHttpError(error))
      );
  }

  handleHttpError(error: any) {
    return throwError(error);
  }
  
}
