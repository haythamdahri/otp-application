import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import * as otpActions from '../actions/otp.actions';

export const authFeatureKey = 'auth';

export interface OtpState {
  isLoading: boolean,
  isLoaded: boolean,
  otpPage: {content: [], pageable: any},
  errorMessage: string,
}

export const initialState: OtpState = {
  isLoading: false,
  isLoaded: false,
  otpPage: {content: [], pageable: {}},
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
    {...state, isLoading: false, otpPage: {content: [], pageable: {}}, errorMessage}
  ))
);