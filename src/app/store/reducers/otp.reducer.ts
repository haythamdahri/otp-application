import { createReducer, on } from '@ngrx/store';
import { Otp } from 'src/app/models/otp';
import { Page } from 'src/app/pagination/page';
import { User } from '../../models/user';
import * as otpActions from '../actions/otp.actions';

export const authFeatureKey = 'auth';

export interface OtpState {
  isLoading: boolean,
  isLoaded: boolean,
  otpPage: Page<Otp>,
  errorMessage: string,
}

export const initialState: OtpState = {
  isLoading: false,
  isLoaded: false,
  otpPage: new Page<Otp>(),
  errorMessage: ''
};

export const otpReducer = createReducer(
  initialState,
  on(otpActions.getUserOtpOperations, state => (
    {...state, isLoading: true, errorMessage: ''}
  )),
  on(otpActions.getUserOtpOperationsSuccess, (state, otpPage) => (
    {...state, isLoading: false, otpPage, errorMessage: '', isLoaded: true}
  )),
  on(otpActions.getUserOtpOperationsFailure, (state, {errorMessage}) => (
    {...state, isLoading: false, otpPage: new Page<Otp>(), errorMessage}
  )),
  on(otpActions.updateOtpOperationsPage, state => (
    {...state, isLoading: true, errorMessage: ''}
  ))
);