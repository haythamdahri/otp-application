import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as otpActions from '../actions/otp.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OtpService } from 'src/app/services/otp.service';

@Injectable()
export class OtpEffects {
  constructor(
    private actions$: Actions,
    private otpService: OtpService
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otpActions.getUserOtpOperations),
      exhaustMap((action) => {
        return this.otpService
          .getOtpOperations({})
          .pipe(
            map((response) => otpActions.getUserOtpOperationsSuccess(response)),
            catchError((error: Error) => {
              return of(
                otpActions.getUserOtpOperationsFailure({
                  errorMessage: 'An error occurred while retrieving user otp operations',
                })
              );
            })
          );
      })
    )
  );

}
