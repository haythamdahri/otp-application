import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import * as authActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthenticated: boolean,
  isLoading: boolean,
  user: User,
  errorMessage: string
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
  errorMessage: ''
};

export const authReducer = createReducer(
  initialState,
  on(authActions.loginUser, state => (
    {...state, isLoading: true, errorMessage: ''}
  )),
  on(authActions.loginUserSuccess, (state, {user}) => (
    {...state, isLoading: false, isAuthenticated: true, user, errorMessage: ''}
  )),
  on(authActions.loginUserFailure, (state, {errorMessage}) => (
    {...state, isLoading: false, isAuthenticated: false, user: {}, errorMessage}
  )),
  on(authActions.logoutUser, (state) => (
    {...state, isLoading: false, isAuthenticated: false, user: {}, errorMessage: ''}
  ))
);