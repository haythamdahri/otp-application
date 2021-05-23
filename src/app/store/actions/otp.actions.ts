import { createAction, props } from '@ngrx/store';
import { OtpRequest } from 'src/app/models/otp-request';
import { Otp } from 'src/app/models/otp';

export const getUserOtpOperations = createAction(
  '[OTP] Get USER OTP Operation'
);

export const getUserOtpOperationsSuccess = createAction(
  '[OTP] Get USER OTP Success',
  props<{ content: [], pageable: any }>()
);

export const getUserOtpOperationsFailure = createAction(
  '[OTP] Get User OTP Failure',
  props<{ errorMessage: string }>()
);

export const createOtpOperation = createAction(
  '[OTP] Create OTP Operation',
  props<OtpRequest>()
);

export const createOtpOperationSuccess = createAction(
  '[OTP] Create OTP Success',
  props<{ otp: Otp}>()
);

export const createOtpOperationFailure = createAction(
  '[OTP] Create OTP Failure',
  props<{ errorMessage: string }>()
);
