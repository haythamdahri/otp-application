import { createAction, props } from '@ngrx/store';
import { OtpRequest } from 'src/app/models/otp-request';
import { OtpCheckRequest } from 'src/app/models/otp-check-request';
import { Otp } from 'src/app/models/otp';
import { Pageable } from 'src/app/pagination/pageable';
import { Page } from 'src/app/pagination/page';

export const getUserOtpOperations = createAction(
  '[OTP] Get USER OTP Operation',
  props<Pageable>()
);

export const getUserOtpOperationsSuccess = createAction(
  '[OTP] Get USER OTP Success',
  props<Page<Otp>>()
);

export const getUserOtpOperationsFailure = createAction(
  '[OTP] Get User OTP Failure',
  props<{ errorMessage: string }>()
);

export const deleteOtpOperation = createAction(
  '[OTP] Delete OTP Operation',
  props<{id: number}>()
);

export const updateOtpOperationsPage = createAction(
  '[OTP] Update OTP Operations Pageable',
  props<Pageable>()
);

export const createOtpOperation = createAction(
  '[OTP] Create OTP Operation',
  props<OtpRequest>()
);

export const checkOtpOperation = createAction(
  '[OTP] Check OTP Operation',
  props<OtpCheckRequest>()
);

export const createOtpOperationSuccess = createAction(
  '[OTP] Create OTP Success',
  props<{ otp: Otp}>()
);

export const deleteOtpOperationFailure = createAction(
  '[OTP] Delete OTP Failure',
  props<{ errorMessage: string }>()
);

export const createOtpOperationFailure = createAction(
  '[OTP] Create OTP Failure',
  props<{ errorMessage: string }>()
);
