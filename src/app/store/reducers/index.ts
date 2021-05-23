import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../../environments/environment';
import { authReducer } from './auth.reducer';
import { AuthState } from './auth.reducer';
import { otpReducer, OtpState } from './otp.reducer';


export interface State {
  auth: AuthState,
  otp: OtpState
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  otp: otpReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['auth', 'otp'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];