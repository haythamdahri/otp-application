import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as otpActions from '../actions/otp.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OtpService } from 'src/app/services/otp.service';
import { Pageable } from 'src/app/pagination/pageable';
declare var bootbox: any;

@Injectable()
export class OtpEffects {
  constructor(private actions$: Actions, private otpService: OtpService) {}

  getUserOtpOperations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        otpActions.getUserOtpOperations,
        otpActions.updateOtpOperationsPage
      ),
      exhaustMap((action) => {
        return this.otpService.getOtpOperations(action).pipe(
          map((response) => otpActions.getUserOtpOperationsSuccess(response)),
          catchError((error: Error) => {
            return of(
              otpActions.getUserOtpOperationsFailure({
                errorMessage:
                  'An error occurred while retrieving user otp operations',
              })
            );
          })
        );
      })
    )
  );

  deleteOtpOperation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otpActions.deleteOtpOperation),
      exhaustMap((action) => {
        return this.otpService.deleteOtpOperation(action?.id).pipe(
          map(() => {
            // Success operation
            bootbox.alert({
              message: "OTP Operation has been deleted successfully",
              backdrop: true
          });
            // Fetch operations
            return otpActions.getUserOtpOperations(new Pageable());
          }),
          catchError((error: Error) => {
            return of(
              otpActions.deleteOtpOperationFailure({
                errorMessage: 'An error occurred while delete otp operation',
              })
            );
          })
        );
      })
    )
  );

  deleteOtpOperationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otpActions.deleteOtpOperationFailure),
        tap((action) => {
          // Display error
          bootbox.alert("An error occurred!");
        })
      ),
    { dispatch: false }
  );
}
